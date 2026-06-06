import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../hooks/custom-world";
import { CheckoutPage } from "../../presentation/pages/checkout-page";

When("I fill in checkout information with {string}, {string}, and {string}", async function (this: ICustomWorld, firstName: string, lastName: string, postalCode: string) {
  const checkoutPage = this.container!.resolve(CheckoutPage);
  await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
  this.logger?.info("Filled checkout info");
});

When("I continue to the next checkout step", async function (this: ICustomWorld) {
  const checkoutPage = this.container!.resolve(CheckoutPage);
  await checkoutPage.clickContinue();
});

When("I finish the checkout", async function (this: ICustomWorld) {
  const checkoutPage = this.container!.resolve(CheckoutPage);
  await checkoutPage.clickFinish();
});

Then("I should see the checkout complete message", async function (this: ICustomWorld) {
  const checkoutPage = this.container!.resolve(CheckoutPage);
  const message = await checkoutPage.getCompleteHeader();
  expect(message).toBe("Thank you for your order!");
});

Then("I should see a checkout error message containing {string}", async function (this: ICustomWorld, expectedError: string) {
  const checkoutPage = this.container!.resolve(CheckoutPage);
  const error = await checkoutPage.getErrorMessage();
  expect(error).toContain(expectedError);
});
