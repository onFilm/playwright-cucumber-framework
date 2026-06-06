# Enterprise Engineering Standards

## Coding Standards
* **Naming Conventions**: 
  * Interfaces prefixed with `I` (e.g., `IAppConfig`).
  * Page Objects suffixed with `Page` or `Component` (e.g., `LoginPage`).
  * Files use `kebab-case` (e.g., `user-factory.ts`).
  * Classes use `PascalCase`.
* **Folder Conventions**: Strict adherence to the Clean Architecture layout (`domain`, `application`, `infrastructure`, `presentation`).
* **Error Handling**: Use explicit `try/catch` in Infrastructure layer. Application layer (Step Definitions) should fail fast and let Cucumber catch and report the error.
* **Logging**: Do not use `console.log`. Always use `LoggerService.info()` or `LoggerService.error()`.

## Security
* **Authentication**: Credentials must never be hardcoded. Use `ConfigManager` which reads from securely injected environment variables.
* **Input Validation**: API responses and configurations must be validated using `zod` schemas.
* **Secrets Management**: DO NOT commit `.env.*` files. Use `.env.example` templates.

## Observability
* **Metrics**: Test execution times are tracked and exported to Allure/CI dashboards natively.
* **Tracing**: Playwright Traces are captured strictly on failure to save disk space and CI upload time, unless overridden by `FORCE_TRACE=true`.
* **Logging**: Logs must include contextual trace IDs (e.g., Scenario ID) to correlate async actions in parallel runs.

## Testing Standards (For the Framework Itself)
* **Unit Tests**: Framework utility functions (e.g., date parsers, string generators) must have Jest unit tests.
* **Contract Tests**: Schema definitions for API clients must be verified against actual backend OpenAPI specs.

## CI/CD
* **Branch Strategy**: Git Flow. `main` is stable. Feature branches must pass all unit tests and core UI smoke tests before merge.
* **PR Requirements**: Minimum 1 approval. Automated linting (`eslint`) and formatting (`prettier`) must pass.
* **Release Process**: Semantic Versioning (SemVer) applied to the internal framework `package.json`.
* **Rollback Process**: Revert commit on `main`. Framework packages must be pinned to exact versions in downstream projects to prevent breaking changes.
