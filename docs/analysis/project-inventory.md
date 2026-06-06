# Project Inventory

## Overview
The repository `playwright-cucumber-framework` is a test automation framework utilizing **Playwright**, **Cucumber-JS**, and **TypeScript**. It serves as a starter project for UI and API automation testing.

## Business Domains
* **Test Automation Execution**: Running BDD (Behavior-Driven Development) feature files.
* **Reporting & Observability**: Generating test reports (Allure, Cucumber HTML/JSON), traces, and videos.
* **Browser Session Management**: Configuring and instantiating Playwright browser contexts (Chromium, Firefox, WebKit).

## Features / Modules
* **Cucumber Integration**: Hooks (`common-hooks.ts`), Custom World (`custom-world.ts`), and step definitions (`login.steps.ts`, `general.steps.ts`).
* **Page Object Model (POM)**: `AllPagesObject` wrapper and `BasePage`.
* **API Utilities**: Helper for Playwright API request context (`apiUtils.ts`).
* **Logging & Telemetry**: Winston logger integration, browser console capture, websocket event listening.
* **Environment Management**: Handling `.env.prod`, `.env.stable`, `.env.snapshot`.

## APIs & Services
* **Playwright Core**: Browser automation API.
* **Playwright Request Context**: Used for API interactions (`request.newContext()`).

## Background Jobs & Integrations
* **CI/CD Integration**: `Jenkinsfile` and `Dockerfile` for Jenkins pipeline execution and containerized test runs.
* **Sauce Labs Integration**: `saucectl` configured for running tests on cloud providers.
* **Allure Reports**: Integration via `@cucumber/pretty-formatter` and `allure-cucumberjs`.

## Databases
* N/A (Currently pure test framework with no persistent datastore).

## External Dependencies
* `@playwright/test`, `playwright`, `playwright-core`
* `@cucumber/cucumber`, `@cucumber/messages`
* `typescript`, `ts-node`
* `winston` (Logging)
* `allure-cucumberjs`, `allure-commandline`
* `chai`, `expect` (Assertions)

## Infrastructure Components
* **Docker**: Base image for execution.
* **Jenkins**: Pipeline defined in `Jenkinsfile`.
