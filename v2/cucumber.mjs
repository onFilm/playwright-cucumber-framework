const getWorldParams = () => {
  return {
	foo: 'bar',
  };
};

const config = {
  requireModule: ['ts-node/register'],
  require: ['v2/src/application/steps/*.ts', 'v2/src/application/hooks/*.ts', 'v2/src/infrastructure/**/*.ts', 'v2/src/shared/**/*.ts'],
  format: [
	'json:reports/cucumber-report-v2.json',
	'html:reports/index-v2.html',
	'rerun:@failedrerun-v2.txt'
  ],
  formatOptions: {snippetInterface: 'async-await'},
  worldParameters: getWorldParams(),
  publishQuiet: true,
  retry: Number(process.env.FLAKY_TEST_RETRY_COUNT || '1'),
  retryTagFilter: '@flaky',
  parallel: Number(process.env.PARALLEL_WORKERS || '1')
};

if (process.env.USE_ALLURE) {
  config.format.push('./v2/src/infrastructure/reporters/allure-reporter.ts:./report-v2.txt');
} else {
  config.format.push('@cucumber/pretty-formatter');
}

export default config;
