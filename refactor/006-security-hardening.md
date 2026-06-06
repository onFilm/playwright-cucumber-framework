# Refactor Plan: 006-security-hardening

## Goal
Ensure the test framework itself follows security best practices, preventing credential leakage and unsafe browser configurations.

## Current State
Browser is launched with unsafe flags (`--disable-web-security`, `--allow-insecure-localhost`) by default. Environment files `.env.prod`, `.env.stable` are present and might track secrets.

## Target State
Browser launches with strict security by default (unsafe flags are opt-in). Secrets are managed via a secrets manager or injected securely by CI/CD, never committed.

## Risks
* Medium risk. Removing unsafe browser flags might break tests running against self-signed local/staging environments.

## Incremental Tasks

### Task 1: Clean Browser Flags
Description: Remove `--disable-web-security` and `--allow-insecure-localhost` from `config.ts` default options. Create a specific `INSECURE_MODE=true` environment override if required for local dev.
Estimated effort: 1 hour
Dependencies: ConfigManager (Refactor 001)
Rollback strategy: Revert flags.
Acceptance criteria: Tests run securely by default.

### Task 2: Secrets Management
Description: Audit `.env.*` files. Add them to `.gitignore` if not already present. Provide `.env.example` templates instead of committing real credentials.
Estimated effort: 1 hour
Dependencies: None
Rollback strategy: N/A.
Acceptance criteria: No hardcoded secrets exist in the repository.

### Task 3: API Auth Handling
Description: Ensure API tokens are masked in the Winston logger and Playwright trace viewer (if possible) or not logged in plaintext.
Estimated effort: 2 hours
Dependencies: API Base Client (Refactor 004)
Rollback strategy: Revert logging changes.
Acceptance criteria: `Bearer` tokens and passwords do not appear in console logs or generated reports.
