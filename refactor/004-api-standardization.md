# Refactor Plan: 004-api-standardization

## Goal
Standardize API testing practices within the framework by replacing loosely structured API calls with robust, typed clients.

## Current State
API interactions are managed through `apiUtils.ts` which uses `request.newContext()` directly on the `CustomWorld`.

## Target State
A formalized API client layer in `src/infrastructure/api/` that handles authentication, retry logic, and strongly typed requests/responses.

## Risks
* Low risk. Current API coverage appears minimal based on directory structure.

## Incremental Tasks

### Task 1: Create API Base Client
Description: Implement a base API client class wrapping Playwright's `APIRequestContext` with built-in logging and error handling.
Estimated effort: 2 hours
Dependencies: BrowserFactory (Refactor 003)
Rollback strategy: Revert branch.
Acceptance criteria: Base client logs requests and responses automatically and formats errors.

### Task 2: Port existing apiUtils.ts
Description: Move `getCall` and related logic from `apiUtils.ts` to the new API base client.
Estimated effort: 1 hour
Dependencies: Task 1
Rollback strategy: Revert to `apiUtils.ts`.
Acceptance criteria: Existing API steps utilize the new client successfully.

### Task 3: Type Validations
Description: Integrate response validation models (e.g., Zod schemas) in the `domain` layer to parse API responses securely.
Estimated effort: 2 hours
Dependencies: Task 2
Rollback strategy: Skip validation layer.
Acceptance criteria: API responses are validated against a schema before being used in assertions.
