declare global {
  namespace NodeJS {
    interface ProcessEnv {
	  BASEURL: string,
	  APIURL: string,
	  BROWSER: "chromium" | "firefox" | "webkit",
	  ENV: "snapshot" | "prod" | "stable",
	  FLAKY_TEST_RETRY_COUNT: string
	  HEAD: "true" | "false",
	  PARALLEL_WORKERS: string,
	  USE_ALLURE: string
    }
  }
}

export {};