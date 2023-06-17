import {IWorldOptions, setWorldConstructor, World} from "@cucumber/cucumber";
import * as messages from "@cucumber/messages";
import {APIRequestContext, BrowserContext, Page, PlaywrightTestOptions} from "@playwright/test";
import {CucumberAllureWorld} from "allure-cucumberjs";
import {Logger} from "winston";
import { AllPagesObject } from "../page-objects/all-page-objects";

export interface ICustomWorld extends World {
  testEnv?: string;
  browser?: string;
  baseurl?: string;
  defaultTimeout?: number;
  debug: boolean;
  feature?: messages.Pickle;
  context?: BrowserContext;
  page?: Page;
  pageObject?: AllPagesObject;
  testName?: string;
  startTime?: Date;
  server?: APIRequestContext;
  playwrightOptions?: PlaywrightTestOptions;
  cucumberAllureWorld?: CucumberAllureWorld;
  isFlag?: boolean;
  sid?: string;
  browserConsoleLogger?: Logger;
  logger?: Logger;
  logFileName?: string;
}

export class CustomWorld extends World implements ICustomWorld {
  debug = false;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
