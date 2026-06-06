# Refactor Plan: 001-foundation

## Goal
Establish the foundational V2 directory structure and centralize configuration management. This prevents fragmentation and standardizes environment parsing across the test framework.

## Current State
Configuration is fragmented across `cucumber.mjs`, `src/utils/setup/config.ts`, and multiple `.env.*` files. Hooks manually extract `process.env` properties.

## Target State
A centralized strongly typed Configuration Manager within `src/infrastructure/config/` that validates and exposes environment and Playwright configurations using `zod`. Furthermore, we initialize a Dependency Injection (DI) container (e.g., `tsyringe`) at the framework root.

## Risks
* Low risk. Changing the configuration layer requires updating imports, which will break tests if not done thoroughly.

## Incremental Tasks

### Task 1: Create V2 Folder Structure
Description: Scaffold `src/domain`, `src/application`, `src/infrastructure`, `src/presentation`, and `src/shared`. Set up `tsyringe` in `src/shared/di/`.
Estimated effort: 1 hour
Dependencies: None
Rollback strategy: Delete directories.
Acceptance criteria: Directories exist and follow V2 architecture.

### Task 2: Implement ConfigManager with Zod
Description: Create `ConfigManager` using `zod` to validate `.env` inputs and expose a strongly typed `AppConfig` interface.
Estimated effort: 2 hours
Dependencies: Task 1
Rollback strategy: Revert to direct `process.env` usage.
Acceptance criteria: ConfigManager can read and validate `.env.stable` and throw errors on missing mandatory keys.

### Task 3: Migrate Setup Config
Description: Move `src/utils/setup/config.ts` into `src/infrastructure/config/` and integrate it with `ConfigManager`.
Estimated effort: 1 hour
Dependencies: Task 2
Rollback strategy: Revert import paths.
Acceptance criteria: `browserOptions` are successfully resolved via the new configuration layer.
