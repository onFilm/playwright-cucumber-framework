# Refactor Plan: 007-observability

## Goal
Standardize and improve the reporting, logging, and metrics gathering of the test automation runs using UUID isolated files.

## Current State
Winston logger is instantiated per test case. Playwright Traces, Videos, and Hars are generated and manually attached to the Allure report in `common-hooks.ts`.

## Target State
A `LoggerService` that generates a unique log file per scenario using UUIDs. These logs are isolated safely during parallel runs and attached to Allure upon scenario completion.

## Risks
* Medium risk. Altering log attachments might break the Allure report output temporarily.

## Incremental Tasks

### Task 1: Scenario-Specific Log Isolation
Description: Create `src/infrastructure/logger/LoggerService.ts`. Ensure it generates a UUID-based log file for each scenario to prevent overlap during parallel execution.
Estimated effort: 2 hours
Dependencies: None
Rollback strategy: Revert to existing Winston implementation.
Acceptance criteria: 10 parallel tests write to 10 distinct `.log` files cleanly.

### Task 2: Standardize Artifact Paths
Description: Configure a centralized `artifacts/` folder (e.g., `artifacts/traces`, `artifacts/videos`, `artifacts/reports/allure`) and update `cucumber.mjs` and Playwright contexts to output here exclusively.
Estimated effort: 1 hour
Dependencies: ConfigManager
Rollback strategy: Revert paths.
Acceptance criteria: `reports/` folder is cleanly replaced by a structured `artifacts/` folder.

### Task 3: CI/CD Telemetry & Allure Attachment
Description: Attach the isolated UUID log files directly to the Cucumber test result in the `After` hook so Allure visualizes the logs per test.
Estimated effort: 1 hour
Dependencies: Task 1
Rollback strategy: Revert hook logic.
Acceptance criteria: Logs are visibly attached to individual test cases in the Allure UI.
