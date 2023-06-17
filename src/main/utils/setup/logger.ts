import {transports} from "winston";

export function options(scenarioName: string) {
  return {
    transports: [
	  new transports.File({
        filename: `reports/logs/${scenarioName}/log.log`,
        level: "info"
	  })
    ]
  };
}

export function optionsBrowserConsoleLogs(scenarioName: string) {
  return {
    transports: [
	  new transports.File({
        filename: `reports/console/${scenarioName}/log.log`,
        level: "info"
	  })
    ]
  };
}