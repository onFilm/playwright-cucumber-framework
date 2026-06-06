import { injectable } from "tsyringe";
import { BasePage } from "./base-page";

@injectable()
export class CartPage extends BasePage {
  
  public async getItemsInCart(): Promise<string[]> {
    const itemElements = this.page.locator('.inventory_item_name');
    const count = await itemElements.count();
    const items: string[] = [];
    for (let i = 0; i < count; i++) {
      items.push(await itemElements.nth(i).innerText());
    }
    return items;
  }

  public async clickCheckout(): Promise<void> {
    await this.page.click('[data-test="checkout"]');
  }

  public async clickContinueShopping(): Promise<void> {
    await this.page.click('[data-test="continue-shopping"]');
  }
}
