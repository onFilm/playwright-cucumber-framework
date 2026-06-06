import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../hooks/custom-world";
import { ApiClient } from "../../infrastructure/api/ApiClient";

let response: any;
let createdUserId: string | number;

Given("the API base URL is reqres", async function (this: ICustomWorld) {
  // Overriding base URL for API tests just in case
  // But usually we just pass the full URL or configure it
});

When("I request the user with ID {int}", async function (this: ICustomWorld, id: number) {
  const api = this.container!.resolve(ApiClient);
  response = await api.get(this.sid!, `https://jsonplaceholder.typicode.com/users/${id}`);
});

When("I attempt to fetch a non-existent user with ID {int}", async function (this: ICustomWorld, id: number) {
  const api = this.container!.resolve(ApiClient);
  response = await api.get(this.sid!, `https://jsonplaceholder.typicode.com/users/${id}`);
});

Then("the API response status should be {int}", async function (this: ICustomWorld, expectedStatus: number) {
  expect(response.status()).toBe(expectedStatus);
});

Then("the response should contain valid user data for {string}", async function (this: ICustomWorld, expectedName: string) {
  const body = await response.json();
  // using any for now since we switched API
  expect(body.name).toBe(expectedName);
});

When("I create a new user with name {string} and job {string}", async function (this: ICustomWorld, name: string, job: string) {
  const api = this.container!.resolve(ApiClient);
  response = await api.post(this.sid!, "https://jsonplaceholder.typicode.com/users", {
    data: { name, job }
  });
  const body = await response.json();
  createdUserId = body.id;
});

When("I update the user's job to {string}", async function (this: ICustomWorld, newJob: string) {
  const api = this.container!.resolve(ApiClient);
  // JSONPlaceholder doesn't persist id 11 from POST, so PUT returns 500. We PUT to id 1.
  response = await api.put(this.sid!, "https://jsonplaceholder.typicode.com/users/1", {
    data: { job: newJob }
  });
});

When("I delete the user", async function (this: ICustomWorld) {
  const api = this.container!.resolve(ApiClient);
  response = await api.delete(this.sid!, `https://jsonplaceholder.typicode.com/users/${createdUserId || 2}`);
});
