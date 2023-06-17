import {When} from "@cucumber/cucumber";
import {checkA11y, getViolations, injectAxe} from "axe-playwright";
import {createHtmlReport} from "axe-html-reporter";
import { ICustomWorld } from "../hooks/custom-world";

When("I axe this page", async function (this: ICustomWorld) {
  await injectAxe(this.page!);
  await checkA11y(this.page!, undefined, {
    detailedReport: true,
    detailedReportOptions: {html: true}
  }).catch(reason => {
    console.log("I axe this page : ", reason);
  });
  createHtmlReport({
    results: {
	  violations: await getViolations(this.page!, undefined)
    },
    options: {
	  outputDir: "reports",
	  reportFileName: "accessibility-report.html"
    }
  }); // passing only violations from axe.run output
});
