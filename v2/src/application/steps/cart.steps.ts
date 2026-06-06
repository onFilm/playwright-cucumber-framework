import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../hooks/custom-world";
import { InventoryPage } from "../../presentation/pages/inventory-page";
import { CartPage } from "../../presentation/pages/cart-page";

When("I navigate to the cart", async function (this: ICustomWorld) {
  const inventoryPage = this.container!.resolve(InventoryPage);
  await inventoryPage.navigateToCart();
  this.logger?.info("Navigated to cart");
});

Then("I should see {string} in the cart", async function (this: ICustomWorld, itemName: string) {
  const cartPage = this.container!.resolve(CartPage);
  const items = await cartPage.getItemsInCart();
  expect(items).toContain(itemName);
  this.logger?.info(`Verified ${itemName} is in the cart`);
});

When("I click checkout", async function (this: ICustomWorld) {
  const cartPage = this.container!.resolve(CartPage);
  await cartPage.clickCheckout();
});

When("I continue shopping", async function (this: ICustomWorld) {
  const cartPage = this.container!.resolve(CartPage);
  await cartPage.clickContinueShopping();
});
