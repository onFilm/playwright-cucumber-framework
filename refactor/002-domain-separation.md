# Refactor Plan: 002-domain-separation

## Goal
Separate the step definitions (application layer) from UI interactions (presentation layer) and decouple assertions from the Page Objects utilizing Dependency Injection.

## Current State
`BasePage` exposes the `expect` library. Steps and hooks heavily rely on the `CustomWorld` holding state and exposing a monolithic `AllPagesObject`.

## Target State
Page Objects are strictly UI interaction maps and return data to Step Definitions. Step Definitions handle all assertions. Page Objects are injected into Step Definitions using `tsyringe` (Dependency Injection) rather than a monolithic registry.

## Risks
* Medium risk. Refactoring all existing tests to move assertions out of POs could lead to test instability.

## Incremental Tasks

### Task 1: Remove Assertions from BasePage
Description: Deprecate and remove `public get expect()` from `BasePage`. Move existing assertions into step definitions.
Estimated effort: 3 hours
Dependencies: None
Rollback strategy: Revert branch.
Acceptance criteria: All step definitions use direct assertion library imports. `BasePage` has no `expect` references.

### Task 2: Implement Page Object DI
Description: Decorate Page Objects with `@injectable()`. Retrieve instances inside Step Definitions via `container.resolve(LoginPage)` instead of `AllPagesObject`.
Estimated effort: 4 hours
Dependencies: Task 1, DI scaffold (Refactor 001)
Rollback strategy: Revert `AllPagesObject` usage.
Acceptance criteria: `AllPagesObject` is removed. Tests instantiate only the pages they need automatically.
