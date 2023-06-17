const getWorldParams = () => {
  return {
	foo: 'bar',
  };
};

const config = {
  requireModule: ['ts-node/register'],
  require: ['/src/main/step-definitions/*.ts', '/src/main/utils/setup/*.ts', 'src/main/utils/*.ts', 'src/main/hooks/*.ts'],
  format: [
	'json:reports/cucumber-report.json',
	'html:reports/report.html',
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
  config.format.push('./src/utils/allure-reporter.ts:./report.txt');
} else {
  config.format.push('@cucumber/pretty-formatter');
}

export default config;