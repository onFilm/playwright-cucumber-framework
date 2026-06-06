# Current Architecture Review

## Architecture Overview
The current architecture follows a monolithic testing framework pattern. It uses the **Page Object Model (POM)** design pattern combined with **Cucumber Custom World** state management to share data and browser contexts across steps.

## Layer Violations & Tight Coupling
* **God Class Anti-Pattern**: `common-hooks.ts` is violating the Single Responsibility Principle. It handles:
  * Browser initialization.
  * Environment variable loading.
  * Logger initialization.
  * Cucumber `Before`/`After` hook management.
  * Network/Websocket interception and logging.
  * Instantiation of all Page Objects (`this.pageObject = new AllPagesObject(this)`).
* **Monolithic Page Registry**: `AllPagesObject` acts as a central registry for *all* page objects. This forces the entire POM tree to be instantiated at the start of every scenario, increasing memory overhead and tightly coupling steps to a single registry.
* **Assertion Coupling**: `BasePage` exposes the `expect` library (`public get expect()`). Page objects should represent the structure and behavior of the application, not handle or expose assertion libraries directly.

## Technical Debt
* **Configuration Fragmentation**: Configuration logic is split across `cucumber.mjs`, `src/utils/setup/config.ts`, `.env.*` files, and hardcoded values inside `common-hooks.ts`.
* **State Management**: Test state is dumped directly onto the `ICustomWorld` interface, making it difficult to track what data is shared between steps and leading to potential race conditions in parallel execution.
* **Hardcoded Paths**: Hardcoded directory paths for traces, hars, and reports (e.g., `reports/traces`, `reports/hars/`) bypass a central configuration strategy.

## Security Concerns
* **Exposed Credentials**: If `.env` files are not properly managed, hardcoded secrets might leak. 
* **Browser Security Flags**: `config.ts` passes multiple insecure flags by default (e.g., `--disable-web-security`, `--allow-insecure-localhost`), which might mask real-world security behavior if used outside local testing.

## Performance Bottlenecks & Scalability Limitations
* **Stateful World**: Because the `CustomWorld` holds the monolithic `AllPagesObject`, adding 100+ pages will significantly degrade test start-up performance and consume excess memory per worker.
* **Parallel Execution Constraints**: Winston logger instances are tied to test cases via file names, which could lead to file lock contention during heavy parallelization if logs are not properly separated by worker ID.
