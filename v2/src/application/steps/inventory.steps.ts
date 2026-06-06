import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../hooks/custom-world";
import { InventoryPage } from "../../presentation/pages/inventory-page";

When("I add {string} to the cart", async function (this: ICustomWorld, itemName: string) {
  const inventoryPage = this.container!.resolve(InventoryPage);
  await inventoryPage.addItemToCart(itemName);
  this.logger?.info(`Added ${itemName} to cart`);
});

When("I remove {string} from the cart", async function (this: ICustomWorld, itemName: string) {
  const inventoryPage = this.container!.resolve(InventoryPage);
  await inventoryPage.removeItemFromCart(itemName);
  this.logger?.info(`Removed ${itemName} from cart`);
});

When("I sort items by {string}", async function (this: ICustomWorld, sortOption: string) {
  const inventoryPage = this.container!.resolve(InventoryPage);
  // sortOption could be "az", "za", "lohi", "hilo"
  await inventoryPage.sortItems(sortOption);
  this.logger?.info(`Sorted items by ${sortOption}`);
});

Then("the cart badge should show {int}", async function (this: ICustomWorld, expectedCount: number) {
  const inventoryPage = this.container!.resolve(InventoryPage);
  const actualCount = await inventoryPage.getCartBadgeCount();
  expect(actualCount).toBe(expectedCount);
  this.logger?.info(`Verified cart badge shows ${expectedCount}`);
});

When("I open the hamburger menu", async function (this: ICustomWorld) {
  const inventoryPage = this.container!.resolve(InventoryPage);
  await inventoryPage.openMenu();
});

When("I click logout", async function (this: ICustomWorld) {
  const inventoryPage = this.container!.resolve(InventoryPage);
  await inventoryPage.logout();
});
