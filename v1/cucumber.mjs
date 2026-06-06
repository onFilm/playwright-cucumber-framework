const getWorldParams = () => {
  return {
	foo: 'bar',
  };
};

const config = {
  requireModule: ['ts-node/register'],
  paths: ["v1/src/features"],
  require: ['v1/src/step-definitions/*.ts', 'v1/src/utils/setup/*.ts', 'v1/src/utils/*.ts', 'v1/src/hooks/*.ts'],
  format: [
	'json:reports/cucumber-report.json',
	'html:reports/index.html',
	'rerun:@failedrerun.txt'
  ],
  formatOptions: {snippetInterface: 'async-await'},
  worldParameters: getWorldParams(),
  publishQuiet: true,
  retry: process.env.FLAKY_TEST_RETRY_COUNT | '1',
  retryTagFilter: '@flaky',
  parallel: process.env.PARALLEL_WORKERS | '1'
};

if (process.env.USE_ALLURE) {
  config.format.push('./src/utils/setup/allure-reporter.ts:./report.txt');
} else {
  config.format.push('@cucumber/pretty-formatter');
}

export default config;