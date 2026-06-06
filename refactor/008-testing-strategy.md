# Refactor Plan: 008-testing-strategy

## Goal
Support a multi-layered automation strategy allowing scenarios to setup state via UI, API, or Database depending on the test requirements.

## Current State
Currently a UI-centric automation framework.

## Target State
The framework supports comprehensive backend integration (`src/infrastructure/database`, `src/infrastructure/api`), enabling test authors to use API or DB hooks to seed states rapidly before E2E UI verification.

## Risks
* Low risk. This is primarily a process and architecture shift, not an immediate code breaker.

## Incremental Tasks

### Task 1: API & DB Clients Implementation
Description: Add database connector utilities (e.g., `pg`, `mongoose`) and enhance the API client. Inject these into step definitions using `tsyringe`.
Estimated effort: 3 hours
Dependencies: DI setup
Rollback strategy: Remove clients.
Acceptance criteria: Tests can interact directly with the backend to verify states.

### Task 2: Background Data Seeding Steps
Description: Create generic Cucumber steps (e.g., `Given a user is created via API`) so UI tests don't have to perform slow UI sign-ups unless it's explicitly an auth test.
Estimated effort: 2 hours
Dependencies: Task 1
Rollback strategy: Revert to UI steps.
Acceptance criteria: Scenarios utilizing API setup run at least 50% faster than their UI equivalents.

### Task 3: Tagging Strategy
Description: Implement standardized tags (e.g., `@smoke`, `@regression`, `@api`, `@e2e`, `@db`) and configure `cucumber.mjs` profiles to run these subsets easily.
Estimated effort: 1 hour
Dependencies: None
Rollback strategy: Revert tags.
Acceptance criteria: Can run `npm run test:api` to only execute `@api` tagged scenarios.
