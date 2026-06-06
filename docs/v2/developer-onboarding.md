# V2 Framework Developer Onboarding Guide

Welcome to the **Enterprise Test Automation Framework (V2)**! This framework leverages **Playwright** for browser and API interactions, **Cucumber-JS** for Behavior-Driven Development (BDD), and **k6** for performance load testing.

This guide will explain exactly how the framework operates, where to add new tests, and how to configure your environment.

---

## 🏗️ 1. What is this framework?

This is a unified testing solution designed to run three types of tests from a single codebase:
1. **UI End-to-End Tests** (Playwright + Cucumber)
2. **Functional API Tests** (Playwright Request + Cucumber)
3. **Performance Load Tests** (k6)

By utilizing **Clean Architecture**, we decouple the test steps from the page objects and domain logic. This means that an API test and a UI test can share the exact same Data Models and Step Definitions.

---

## 📂 2. Where are things located?

To understand where to write or update code, familiarize yourself with the directory structure. We use the `src/` directory to hold all application logic, while `tests/` holds the BDD feature files.

```text
├── tests/
│   ├── ui/                 👈 Add new UI .feature files here.
│   └── api/                👈 Add new API .feature files here.
│
├── src/
│   ├── application/        👈 Cucumber Step Definitions live here.
│   │   ├── steps/          (e.g., login.steps.ts, cart.steps.ts)
│   │   └── hooks/          (Setup and teardown hooks)
│   │
│   ├── presentation/       👈 Page Objects live here. (UI interactions only).
│   │   └── pages/          (e.g., LoginPage.ts, DashboardPage.ts)
│   │
│   ├── infrastructure/     👈 The "engine room". You rarely need to touch this.
│   │   ├── api/            (API Clients wrapper)
│   │   ├── driver/         (Playwright browser factory)
│   │   ├── config/         (Environment variables schema using Zod)
│   │   └── logger/         (Winston logging service)
│   │
│   ├── domain/             👈 Test data models and JSON fixtures.
│   │   ├── models/         (e.g., User.ts interface)
│   │   └── fixtures/       (e.g., default-credentials.json)
│   │
│   └── performance/        👈 Add k6 load testing scripts here.
│       └── scenarios/      (e.g., peak-load-test.ts)
```

---

## ✍️ 3. How to add a new UI Test

Follow this workflow to add a new UI feature.

### Step 1: Write the Feature File
Create a new file under `tests/ui/` (e.g., `checkout.feature`).
```gherkin
Feature: Checkout Process

  @ui @checkout
  Scenario: Successfully check out a cart
    Given the user is logged in as "standard_user"
    When the user adds "Sauce Labs Backpack" to the cart
    And the user completes the checkout form
    Then the order confirmation should be displayed
```

### Step 2: Create or Update the Page Object
If the feature requires a new page (e.g., Checkout form), go to `src/presentation/pages/` and create `CheckoutPage.ts`. 
**Rule:** Page Objects should *only* perform interactions (clicks, typing, reading text). They should **never** contain assertions (`expect()`).

```typescript
import { Page } from '@playwright/test';
import { injectable } from 'tsyringe';

@injectable()
export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCheckoutForm(firstName: string, lastName: string) {
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.click('#continue');
  }
  
  async getConfirmationText() {
    return this.page.innerText('.complete-header');
  }
}
```

### Step 3: Write the Step Definition
Go to `src/application/steps/` and bind the Cucumber step to the Page Object. We use Dependency Injection (`tsyringe`) to automatically provide the Page Object.

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { container } from 'tsyringe';
import { CheckoutPage } from '../../presentation/pages/CheckoutPage';

When('the user completes the checkout form', async function () {
  const checkoutPage = container.resolve(CheckoutPage);
  await checkoutPage.fillCheckoutForm('John', 'Doe');
});

Then('the order confirmation should be displayed', async function () {
  const checkoutPage = container.resolve(CheckoutPage);
  const text = await checkoutPage.getConfirmationText();
  expect(text).toBe('THANK YOU FOR YOUR ORDER'); // Assertion belongs here!
});
```

---

## 🔌 4. How to add a new API Test

API tests work identically to UI tests, but they bypass the `presentation/` (Page Object) layer and directly use the API Clients located in `src/infrastructure/api/`.

Create a file in `tests/api/users.feature`:
```gherkin
Feature: User API

  @api
  Scenario: Fetch user details
    When I request the details for user ID 1
    Then the response status should be 200
```

In your step definitions, use the injected `ApiClient`:
```typescript
import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { container } from 'tsyringe';
import { UserApiClient } from '../../infrastructure/api/UserApiClient';

When('I request the details for user ID {int}', async function (userId: number) {
  const apiClient = container.resolve(UserApiClient);
  this.response = await apiClient.getUser(userId); // Store response in CustomWorld
});

Then('the response status should be {int}', function (status: number) {
  expect(this.response.status()).toBe(status);
});
```

---

## 🚀 5. Running the Tests

The framework provides multiple `npm` scripts to target specific areas of testing.

| Command | Action |
| --- | --- |
| `npm run test:ui` | Runs all `.feature` files inside `tests/ui/` using Playwright UI browsers. |
| `npm run test:api` | Runs all `.feature` files inside `tests/api/` (no UI overhead). |
| `npm run test:perf` | Bundles and executes the k6 load testing scripts inside `src/performance/`. |
| `npm run report` | Opens the local Allure dashboard to view functional and UI test results. |

### Environment Variables
Before running tests locally, ensure you have an environment file. Copy `.env.example` to `.env.local` and fill in any required URLs or credentials. The Zod ConfigManager will validate this on startup to ensure you aren't missing required keys!
