import { injectable } from "tsyringe";
import { BasePage } from "./base-page";

@injectable()
export class InventoryPage extends BasePage {
  
  public async addItemToCart(itemName: string): Promise<void> {
    const itemLocator = itemName.toLowerCase().replace(/ /g, '-');
    await this.page.click(`[data-test="add-to-cart-${itemLocator}"]`);
  }

  public async removeItemFromCart(itemName: string): Promise<void> {
    const itemLocator = itemName.toLowerCase().replace(/ /g, '-');
    await this.page.click(`[data-test="remove-${itemLocator}"]`);
  }

  public async navigateToCart(): Promise<void> {
    await this.page.click('.shopping_cart_link');
  }

  public async getCartBadgeCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.count() === 0) {
      return 0;
    }
    const count = await badge.innerText();
    return parseInt(count);
  }

  public async sortItems(sortOption: string): Promise<void> {
    await this.page.selectOption('.product_sort_container', sortOption);
  }

  public async openMenu(): Promise<void> {
    await this.page.click('#react-burger-menu-btn');
  }

  public async logout(): Promise<void> {
    await this.page.click('#logout_sidebar_link');
  }
}
