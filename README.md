## What's inside

- Typescript setup for writing steps with eslint/typescript and prettier
- Launching of Playwright browser before running all tests
- Launching new context and page for each scenario
- Allure reports

## Install

`npm install`

## To run your tests

`npm run test` or `npx cucumber-js` runs all tests
`npm run test <feature name>` or `npx cucumber-js <feature name>` run the single feature

Allure report will generate once tests are executed

## To run allure report manually

`npm run clean-reports` deletes allure-results folder
`npm run allure` generates allure report and opens the same in a browser

Turn off Allure report by changing from USE_ALLURE=1 to USE_ALLURE=0 in package.json file -> test script

## Browser selection

By default we will use chromium. You can define an envrionment variable called BROWSER and
set the name of the browser. Available options: chromium, firefox, webkit

```
set BROWSER=firefox
npm run test
```

## To ignore a scenario

- tag the scenario with `@ignore`

## To check for typescript, linting and gherkin errors

- run the command `npm run build`.

## To view the steps usage

- run the command `npm run steps-usage`.

## To view the html report of the last run

- run the command `npm run report`.
