# Refactor Plan: 003-infrastructure-isolation

## Goal
Isolate Playwright browser initialization and API context generation from the Cucumber Hooks.

## Current State
`common-hooks.ts` is a God object managing browser instantiation, recording videos/traces/hars, setting up loggers, and parsing environments.

## Target State
Hooks solely act as Cucumber bindings, delegating work to `BrowserFactory`, `ReporterService`, and `LoggerService`.

## Risks
* High risk. Hooks control the lifecycle of tests; errors here will cause parallel execution issues, test hangs, and resource leaks.

## Incremental Tasks

### Task 1: Create BrowserFactory
Description: Create `src/infrastructure/driver/BrowserFactory.ts` to handle `browser.launch()` and `browser.newContext()`.
Estimated effort: 3 hours
Dependencies: ConfigManager (Refactor 001)
Rollback strategy: Revert to hook-based launching.
Acceptance criteria: BrowserFactory exposes `createSession()` returning a ready-to-use Page context.

### Task 2: Create ReporterService
Description: Extract Allure, Har, Trace, and Video reporting logic into `src/infrastructure/reporters/ReporterService.ts`.
Estimated effort: 2 hours
Dependencies: None
Rollback strategy: Revert to hook-based reporting.
Acceptance criteria: ReporterService handles `attach()` calls for images, videos, and logs natively.

### Task 3: Refactor common-hooks.ts
Description: Clean up `common-hooks.ts` to only invoke factory and service methods.
Estimated effort: 2 hours
Dependencies: Task 1, Task 2
Rollback strategy: Revert branch.
Acceptance criteria: `common-hooks.ts` size is reduced by 70%. Tests run and report exactly as before.
