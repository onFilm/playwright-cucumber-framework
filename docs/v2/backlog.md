# V2 Implementation Backlog

## Epic 1: Foundation & Architecture Scaffold
### Feature: Project Structure Modernization
#### Story: Setup V2 Directories
##### Tasks
- Create `src/domain`, `application`, `infrastructure`, `presentation`, `shared` directories. (Priority: High, Complexity: Low)
- Configure `tsconfig.json` path aliases for new directories. (Priority: High, Complexity: Low)

### Feature: Configuration Management
#### Story: Implement ConfigManager
##### Tasks
- Install `zod` for environment validation. (Priority: High, Complexity: Medium)
- Create `AppConfig` interface and parsing logic. (Priority: High, Complexity: Medium)
- Integrate ConfigManager with existing `.env` files. (Priority: High, Complexity: Medium)

## Epic 2: Infrastructure Isolation
### Feature: Browser & Context Factories
#### Story: Extract Browser Launching
##### Tasks
- Create `BrowserFactory.ts`. (Priority: High, Complexity: Medium)
- Remove `browser.launch` from `common-hooks.ts`. (Priority: High, Complexity: High)

### Feature: Telemetry & Reporting
#### Story: Centralize Logging and Artifacts
##### Tasks
- Create `LoggerService.ts`. (Priority: Medium, Complexity: Low)
- Extract Allure attachment logic into `ReporterService.ts`. (Priority: High, Complexity: Medium)

## Epic 3: Core Framework Refactoring
### Feature: Page Object Modernization
#### Story: Dismantle AllPagesObject
##### Tasks
- Implement Lazy Loading or DI for Page Objects. (Priority: High, Complexity: High, Risk: High)
- Refactor all Step Definitions to import Page Objects directly. (Priority: High, Complexity: High)

### Feature: Assertion Layer Separation
#### Story: Remove Assertions from UI layer
##### Tasks
- Remove `expect` from `BasePage.ts`. (Priority: High, Complexity: Low)
- Add explicit assertions directly in Step Definitions. (Priority: High, Complexity: High)

## Epic 4: Migration & Cutover
### Feature: CI/CD Updates
#### Story: Dual Pipeline Run
##### Tasks
- Update `Jenkinsfile` to run both V1 and V2 folders. (Priority: High, Complexity: Medium)
- Validate test reporting aggregation. (Priority: High, Complexity: Low)
