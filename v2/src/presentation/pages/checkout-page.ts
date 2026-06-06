import { injectable } from "tsyringe";
import { BasePage } from "./base-page";

@injectable()
export class CheckoutPage extends BasePage {
  
  public async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.fill("[data-test=\"firstName\"]", firstName);
    await this.page.fill("[data-test=\"lastName\"]", lastName);
    await this.page.fill("[data-test=\"postalCode\"]", postalCode);
  }

  public async clickContinue(): Promise<void> {
    await this.page.click("[data-test=\"continue\"]");
  }

  public async getErrorMessage(): Promise<string> {
    return await this.page.locator("[data-test=\"error\"]").innerText();
  }

  public async clickFinish(): Promise<void> {
    await this.page.click("[data-test=\"finish\"]");
  }

  public async getCompleteHeader(): Promise<string> {
    return await this.page.locator(".complete-header").innerText();
  }
}
