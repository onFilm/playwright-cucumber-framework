# V2 Migration Guide

Welcome to the new V2 Enterprise Playwright Framework!

This guide will help you migrate your legacy tests from `v1` to `v2`.

## Why V2?

The V1 framework heavily relied on `AllPagesObject` and God-Classes, which coupled the entire application state into memory for every scenario. It also mixed UI interactions with API test setups, creating a tangled, unscalable architecture.

V2 solves this by implementing **Clean Architecture**:
- **Dependency Injection (tsyringe)**: Objects are injected as-needed per scenario using `@injectable()`.
- **Domain-Driven Design (Zod)**: Test data is mapped strictly from Cucumber DataTables into typed Domain Models (e.g., `User.ts`).
- **Performance Parity (k6)**: The same Domain Models can be reused inside the new standalone `k6` performance test suite!

---

## 1. Directory Restructuring

If you are moving a test from `v1/features/`, you should place it into either `v2/tests/ui/` or `v2/tests/api/` based on what it fundamentally asserts.

If you are migrating a Page Object from `v1/src/page-objects/`, it should move to `v2/src/presentation/pages/`.

## 2. Using Dependency Injection in Step Definitions

**Legacy V1 Approach:**
```typescript
Given("User logs in", async function (this: ICustomWorld) {
    // Relying on a massive 'pages' object attached to the CustomWorld
    await this.pages?.loginPage?.login("user", "pass");
});
```

**New V2 Approach:**
```typescript
import { LoginPage } from "../../presentation/pages/login-page";

Given("User logs in", async function (this: ICustomWorld) {
    // Resolve the page dynamically from the isolated DI container
    const loginPage = this.container!.resolve(LoginPage);
    await loginPage.login("user", "pass");
});
```

## 3. Creating New Page Objects

Page Objects in V2 must extend `BasePage` and use the `@injectable()` decorator. They no longer inherit from `ICustomWorld`!

```typescript
import { injectable } from "tsyringe";
import { BasePage } from "./base-page";

@injectable()
export class CheckoutPage extends BasePage {
  public async checkout(): Promise<void> {
    await this.page.click('#checkout');
  }
}
```

## 4. API Backgrounds (No More UI Seed Data!)

If your UI test needs seeded database data, **DO NOT** use Playwright UI clicks to build it.
Inject the `ApiClient` inside your Step Definition, build the data using a `Zod` domain model, and POST it via the backend before the UI test starts!

```typescript
import { ApiClient } from "../../infrastructure/api/ApiClient";
import { UserMapper } from "../../domain/models/User";

Given("the user is seeded in the database:", async function (this: ICustomWorld, dataTable: DataTable) {
    const user = UserMapper.fromDataTable(dataTable.hashes()[0]);
    const api = this.container!.resolve(ApiClient);
    await api.post(this.sid!, "/users/seed", { data: user });
});
```

## 5. Execution Commands

- Legacy Tests: `npm run test`
- V2 UI Tests: `npm run test:v2:ui`
- V2 API Tests: `npm run test:v2:api`
- V2 Performance Tests: `npm run test:v2:perf`
