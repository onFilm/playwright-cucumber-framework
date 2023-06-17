import {ICustomWorld} from "./custom-world";
import {After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status} from "@cucumber/cucumber";
import {ChromiumBrowser, FirefoxBrowser, WebKitBrowser} from "@playwright/test";
import {ITestCaseHookParameter} from "@cucumber/cucumber/lib/support_code_library_builder/types";
import {ensureDir} from "fs-extra";
import {createLogger} from "winston";
import {request} from "playwright";
import {chromium, firefox, webkit} from "playwright-core";
import fs from "fs";
import { config } from "../utils/setup/config";
import { getEnv } from "../utils/env/env";
import { options, optionsBrowserConsoleLogs } from "../utils/setup/logger";
import { AllPagesObject } from "../page-objects/all-page-objects";
import { getCall } from "../utils/apiUtils";

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDir = "reports/traces";
const harsDir = "reports/hars/";

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {
  getEnv();
  switch (config.browser) {
    case "firefox":
      browser = await firefox.launch(config.browserOptions);
      break;
    case "webkit":
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
  await ensureDir(tracesDir);
});

Before({tags: "@ignore"}, async function () {
  return "skipped" as string;
});

Before({tags: "@debug"}, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function ({pickle}: ITestCaseHookParameter) {
  let skipTest = false;
  pickle.tags.forEach(value => {
    if (value.name == "@prod_skipped") {
      skipTest = true;
    }
  });
  
  if (skipTest) {
    return "skipped" as string;
  } else {
    return "";
  }
});

Before(async function (this: ICustomWorld, {pickle}: ITestCaseHookParameter) {
  this.testEnv = process.env.ENV;
  this.browser = process.env.BROWSER;
  this.baseurl = process.env.BASEURL;
  this.feature = pickle;
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, "-");
  this.logFileName = this.testName.replace(/ /g, "") + "_" + pickle.id;
  this.logger = createLogger(options(this.logFileName));
  this.browserConsoleLogger = createLogger(optionsBrowserConsoleLogs(this.logFileName));

  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    recordHar: {path: harsDir + this.logFileName + ".har", urlFilter: "**/api/**"},
    strictSelectors: false,
    acceptDownloads: true,
    viewport: null
  });
  this.page = await this.context.newPage();
  this.server = await request.newContext();

  // Subscribe to 'console', 'request', 'response' and 'websocket' events.
  this.page.on("console", msg => this.browserConsoleLogger?.info("console - >> " + msg.text()));
  this.page.on("request", request => this.logger?.info("request - >> " + request.method() + " " + request.url()));
  this.page.on("response", response => this.logger?.info("response - << " + response.status() + " " + response.url()));
  this.page.on("websocket", ws => {
    this.logger?.info(`WebSocket opened: ${ws.url()}`);
    ws.on("framesent", event => this.logger?.info("WSS - request >> " + event.payload));
    ws.on("framereceived", event => this.logger?.info("WSS - response >> " + event.payload));
    ws.on("close", () => this.logger?.info("WebSocket closed"));
  });

  this.sid = await getCall(this);
  this.pageObject = new AllPagesObject(this);
});

After(async function (this: ICustomWorld, {result}: ITestCaseHookParameter) {
  if (result) {
    await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);
    if (result.status !== Status.PASSED) {
	  const image = await this.page?.screenshot();
	  image && (await this.attach(image, "image/png"));
	  await this.page?.close();
	  await this.context?.close();
	  await this.attach(fs.readFileSync(`reports/logs/${this.logFileName}/log.log`).toString("utf-8"), "text/plain");
      await this.attach(fs.readFileSync(`reports/console/${this.logFileName}/log.log`).toString("utf-8"), "text/plain");
      await this.attach(fs.readFileSync(harsDir + this.logFileName + ".har").toString("utf-8"), "application/json");
    } else {
	  await this.page?.close();
	  await this.context?.close();
    }
  }
});

AfterAll(async function () {
  await browser.close();
});
