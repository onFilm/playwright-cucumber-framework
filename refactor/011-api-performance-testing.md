# Refactor Plan: 011-api-performance-testing

## Goal
Expand the test framework to natively support Functional API Testing (via Playwright) and Performance API Testing (via k6), fully decoupling tests into `ui` and `api` branches.

## Current State
The framework is exclusively UI-focused with rudimentary API calls used sparingly in `common-hooks.ts` and `apiUtils.ts`.

## Target State
Dedicated feature file directories for UI and API tests. A new `src/performance` directory for `k6` load testing scripts that reuse the domain models.

## Risks
* Low risk. Purely additive to the V2 architecture plan.

## Incremental Tasks

### Task 1: Separate UI and API Test Suites
Description: Create `tests/ui/` and `tests/api/` directories. Move existing UI feature files into `tests/ui/`. Update `cucumber.mjs` profiles to target specific directories based on NPM scripts.
Estimated effort: 1 hour
Dependencies: V2 Folder Scaffold
Rollback strategy: Revert to flat `features/` directory.
Acceptance criteria: `npm run test:ui` executes only UI features. `npm run test:api` executes only API features.

### Task 2: Implement Functional API Clients
Description: Build Playwright `APIRequestContext` wrappers in `src/infrastructure/api/`. Inject these via `tsyringe` into Step Definitions. Functional API tests will use these clients to assert endpoints independently of the UI.
Estimated effort: 3 hours
Dependencies: DI framework (Refactor 001)
Rollback strategy: N/A.
Acceptance criteria: An API-only feature file passes and reports cleanly to Allure.

### Task 3: Scaffold k6 Performance Engine
Description: Install `k6`. Create `src/performance/load-test.ts`. Configure a webpack/rollup bundler if necessary to compile TypeScript into k6-compatible scripts (as k6 runs a distinct JS runtime).
Estimated effort: 3 hours
Dependencies: None
Rollback strategy: Remove k6 dependency.
Acceptance criteria: `k6 run dist/performance/load-test.js` successfully executes a load test utilizing the shared `domain` interfaces.

### Task 4: API Independent Reporting
Description: Configure Allure for the `test:api` script. Add a `k6-reporter` script to generate an independent HTML load-test report.
Estimated effort: 1 hour
Dependencies: Task 3
Rollback strategy: N/A
Acceptance criteria: CI generates an Allure report for functional tests, and a standalone HTML report for k6 tests.
