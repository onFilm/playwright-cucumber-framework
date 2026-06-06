import { injectable } from "tsyringe";
import { BasePage } from "./base-page";

@injectable()
export class LoginPage extends BasePage {
  
  public async login(username: string, password: string): Promise<void> {
    await this.page.fill("[data-test=\"username\"]", username);
    await this.page.fill("[data-test=\"password\"]", password);
    await this.page.click("[data-test=\"login-button\"]");
  }

}
