# Refactor Plan: 009-performance-optimization

## Goal
Optimize test execution speed and reduce the memory footprint per worker to allow highly scalable parallel execution.

## Current State
The monolithic `AllPagesObject` instantiates every page object in the project at the beginning of each scenario. Furthermore, Winston loggers are repeatedly created and stored in the CustomWorld.

## Target State
Lazy initialization of Page Objects. Singleton loggers. Reduced UI interaction where API interaction suffices.

## Risks
* Medium risk. Refactoring Page Object access patterns will touch every single step definition.

## Incremental Tasks

### Task 1: Lazy Initialization of POs
Description: Replace `AllPagesObject` direct instantiation with getters that only instantiate a Page Object when it is actually accessed.
Estimated effort: 3 hours
Dependencies: Domain Separation (Refactor 002)
Rollback strategy: Revert branch.
Acceptance criteria: Memory snapshot shows significantly fewer Page Object instances residing in memory during a test run.

### Task 2: Parallelization Tuning
Description: Update `cucumber.mjs` to dynamically scale the `--parallel` flag based on `os.cpus()` rather than hardcoding or relying solely on external environment variables.
Estimated effort: 1 hour
Dependencies: ConfigManager
Rollback strategy: Revert to static parallel config.
Acceptance criteria: `npm run test:parallel` utilizes optimal thread count without crashing due to file I/O locks.
