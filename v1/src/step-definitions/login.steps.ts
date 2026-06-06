import { Given, setDefaultTimeout } from "@cucumber/cucumber";
import { ICustomWorld } from "../hooks/custom-world";

setDefaultTimeout(60 * 1000 * 2);

Given("User navigates to the application", async function (this: ICustomWorld) {
  await this.page?.goto(this.baseurl!);
  await this.page?.waitForTimeout(10000);
  this.logger?.info("Navigated to the application");
});

Given("I login to SwagLabs app with username {string} and password {string}", async function (this: ICustomWorld, username: string, password: string) {
  console.log(username, " " ,password);
});

Given("I print the credential in console", async function (this: ICustomWorld) {
  console.log(" Test step");
  this.logger?.info(" Test step");
});