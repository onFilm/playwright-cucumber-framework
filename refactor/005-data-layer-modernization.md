# Refactor Plan: 005-data-layer-modernization

## Goal
Manage test data elegantly by driving all data directly from Cucumber Feature files (Steps and Examples Datatables).

## Current State
Data handling is rudimentary.

## Target State
Test data is exclusively sourced from the BDD feature files via parameters, DataTables, and Example rows. The `shared` layer will parse these into domain models.

## Risks
* Low risk. Purely additive pattern.

## Incremental Tasks

### Task 1: DataTable Parsing Utilities
Description: Create strongly-typed mappers in `src/shared/data/` that take Cucumber DataTables and convert them into `domain` interfaces (e.g., `User` objects).
Estimated effort: 2 hours
Dependencies: None
Rollback strategy: Remove mapping logic.
Acceptance criteria: Steps can pass a Cucumber `DataTable` to a mapper and receive a strictly typed TypeScript object array.

### Task 2: Scenario State Management
Description: Ensure parsed data from feature files is safely stored in the `CustomWorld` or a Scoped DI container for sharing between steps within a single scenario.
Estimated effort: 1 hour
Dependencies: Task 1
Rollback strategy: N/A.
Acceptance criteria: Data parsed in a `Given` step is accessible in the `Then` assertion step.
