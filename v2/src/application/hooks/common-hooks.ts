import { ICustomWorld } from "./custom-world";
import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { ITestCaseHookParameter } from "@cucumber/cucumber/lib/support_code_library_builder/types";
import { container } from "tsyringe";
import { ConfigManager } from "../../infrastructure/config/ConfigManager";
import { BrowserFactory } from "../../infrastructure/driver/BrowserFactory";
import { LoggerService } from "../../infrastructure/logger/LoggerService";
import { ReporterService } from "../../infrastructure/reporters/ReporterService";
import { ApiClient } from "../../infrastructure/api/ApiClient";
import crypto from "crypto";

setDefaultTimeout(ConfigManager.config.PWDEBUG ? -1 : ConfigManager.config.DEFAULT_TIMEOUT);

BeforeAll(async function () {
  LoggerService.initialize();
  const browserFactory = container.resolve(BrowserFactory);
  await browserFactory.launchBrowser();
});

Before({tags: "@ignore"}, async function () {
  return "skipped" as string;
});

Before({tags: "@debug"}, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, {pickle}: ITestCaseHookParameter) {
  // Check skipped tags
  const skipTest = pickle.tags.some(tag => tag.name === "@prod_skipped");
  if (skipTest) return "skipped";

  this.sid = crypto.randomUUID(); // Scenario UUID isolation
  this.testName = pickle.name.replace(/\W/g, "-");
  this.startTime = new Date();
  
  this.logger = LoggerService.getLogger(this.sid);
  this.logger.info(`Starting scenario: ${this.testName}`);

  // Create an isolated DI container for this scenario
  this.container = container.createChildContainer();

  // Resolve Infrastructure Factories
  const browserFactory = container.resolve(BrowserFactory);
  const apiClient = container.resolve(ApiClient);

  // If this is a UI test, instantiate browser contexts
  if (!pickle.tags.some(tag => tag.name === "@api")) {
    this.context = await browserFactory.createBrowserContext(this.sid, this.testName);
    this.page = await browserFactory.getPage(this.sid);
    
    // Register the isolated Page instance into the scenario container
    this.container.registerInstance("Page", this.page);
  }

  // API Context for backend steps
  this.server = await apiClient.getContext(this.sid);
  this.container.registerInstance("Server", this.server);
  return;
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  const browserFactory = container.resolve(BrowserFactory);
  const apiClient = container.resolve(ApiClient);

  // Attach Artifacts
  await ReporterService.attachArtifacts(this.attach.bind(this), this.sid!, this.testName!, result, this.page);

  // Cleanup UI Context
  if (this.page) {
    await browserFactory.closeContext(this.sid!);
  }

  // Cleanup API Context
  await apiClient.disposeContext(this.sid!);

  // Close isolated logger
  LoggerService.closeLogger(this.sid!);
});

AfterAll(async function () {
  const browserFactory = container.resolve(BrowserFactory);
  await browserFactory.closeBrowser();
});
