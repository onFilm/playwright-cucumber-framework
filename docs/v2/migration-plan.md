# V2 Migration Plan

## Current State
A monolithic, highly coupled testing framework where hooks control execution lifecycle, configurations are scattered, and page objects are grouped into a single heavy registry (`AllPagesObject`).

## Future State (V2)
A scalable, layered, Clean Architecture testing framework utilizing Dependency Injection, Lazy Initialization, and centralized configuration/reporting services.

## Incremental Migration Phases

### Phase 1: Foundation (Weeks 1-2)
1. Scaffold the V2 directory structure (`src/domain`, `src/infrastructure`, etc.).
2. Implement `ConfigManager` and `LoggerService`.
3. Update `.env` file management and security protocols.
*Impact*: Zero impact on existing tests. Additive only.

### Phase 2: Infrastructure Abstraction (Weeks 3-4)
1. Build `BrowserFactory` and `ReporterService`.
2. Introduce lightweight Custom Hooks in the V2 folder (`src/application/hooks`).
3. Set up the Jenkins CI pipeline to support dual test discovery.
*Impact*: Parallel running of V1 and V2 infrastructure.

### Phase 3: Presentation Decoupling (Weeks 5-6)
1. Deprecate `AllPagesObject`.
2. Refactor existing Page Objects to remove `expect` calls.
3. Move Page Objects to `src/presentation/`.
*Impact*: Widespread test file modifications. This is the highest risk phase. Requires strict PR reviews.

### Phase 4: Feature Cutover (Weeks 7-8)
1. Move Step Definitions from `src/step-definitions` to `src/application/steps`.
2. Validate API tests using the new API Clients.
3. Update `cucumber.mjs` to target exclusively the V2 structure.
*Impact*: The framework now entirely uses V2 patterns.

## Parallel Run Strategy
During Phases 2 & 3, the CI pipeline will execute:
`npm run test:v1` -> points to old directories.
`npm run test:v2` -> points to newly migrated features.
This ensures zero downtime for the QA automation feedback loop.

## Rollback Procedures
* **Code Reverts**: Git reverts for specific PRs. Because tests are migrated feature-by-feature, rolling back one broken feature does not invalidate the entire migration.
* **Pipeline Rollback**: If V2 tests exhibit flaky behavior in CI, the Jenkins execution string can immediately fall back to the V1 targets until the infrastructure bug is resolved.

## Cutover Plan
Once `src/application/steps` covers 100% of the active scenarios, the legacy folders (`src/hooks`, `src/utils`, `src/page-objects`) will be deleted. The final cutover PR will also remove the dual-run strategy from Jenkins.
