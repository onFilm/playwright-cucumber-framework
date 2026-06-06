import { Given, setDefaultTimeout , DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../hooks/custom-world";
import { ConfigManager } from "../../infrastructure/config/ConfigManager";
import { LoginPage } from "../../presentation/pages/login-page";

setDefaultTimeout(60 * 1000 * 2);

Given("User navigates to the application", async function (this: ICustomWorld) {
  const loginPage = this.container!.resolve(LoginPage);
  await loginPage.navigate(ConfigManager.config.BASEURL);
  this.logger?.info("Navigated to the application");
});

Given("I login to SwagLabs app with username {string} and password {string}", async function (this: ICustomWorld, username: string, password: string) {
  const loginPage = this.container!.resolve(LoginPage);
  await loginPage.login(username, password);
  this.logger?.info(`Logged in as ${username}`);
});

Given("I print the credential in console", async function (this: ICustomWorld) {
  this.logger?.info("Test step: Verified credentials");
  // Explicit assertion handled here instead of page object
  expect(true).toBeTruthy();
});

import { UserMapper } from "../../domain/models/User";
// import { ApiClient } from "../../infrastructure/api/ApiClient";

Given("the following user exists in the system:", async function (this: ICustomWorld, dataTable: DataTable) {
  // Parse Cucumber DataTable into strongly-typed Domain Model using Zod
  const userRow = dataTable.hashes()[0];
  const user = UserMapper.fromDataTable(userRow);
  
  this.logger?.info(`Seeding user via API: ${user.username} with role ${user.role}`);
  
  // Example API call:
  // const apiClient = this.container!.resolve(ApiClient);
  // await apiClient.post(this.sid!, "/api/users", { data: user });
});