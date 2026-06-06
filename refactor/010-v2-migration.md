# Refactor Plan: 010-v2-migration

## Goal
Provide a comprehensive cutover strategy to migrate from the V1 architecture (current) to the newly built V2 architecture.

## Current State
Tests run in the legacy structure under `src/hooks`, `src/utils`, `src/page-objects`.

## Target State
All new and migrated tests run natively in the V2 `src/domain`, `src/application`, `src/infrastructure`, `src/presentation` folder structure.

## Risks
* High risk. Big bang migrations pause feature delivery and cause massive merge conflicts.

## Incremental Tasks

### Task 1: Dual Run Pipeline
Description: Configure the Jenkins CI pipeline to run both V1 tests and migrated V2 tests independently. 
Estimated effort: 2 hours
Dependencies: CI/CD Telemetry (Refactor 007)
Rollback strategy: Disable V2 Jenkins stage.
Acceptance criteria: Pipeline executes V1 and V2 folders without conflict.

### Task 2: Feature-by-Feature Migration
Description: Move one feature file at a time. Update its step definitions to use the V2 infrastructure (ConfigManager, BrowserFactory). Delete the old V1 step definitions.
Estimated effort: 10+ hours (Depends on project size)
Dependencies: All previous refactors.
Rollback strategy: Revert individual feature migrations.
Acceptance criteria: Feature tests pass in V2 pipeline.

### Task 3: Legacy Cleanup
Description: Once all features are migrated, delete `src/hooks`, `src/page-objects`, `src/utils`.
Estimated effort: 1 hour
Dependencies: Task 2
Rollback strategy: Restore from Git.
Acceptance criteria: Legacy directories are removed. Codebase is 100% V2.
