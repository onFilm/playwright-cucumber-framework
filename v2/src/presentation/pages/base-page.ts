import { Page } from "@playwright/test";
import { inject, injectable } from "tsyringe";

@injectable()
export class BasePage {
  protected page: Page;

  constructor(@inject("Page") page: Page) {
    this.page = page;
  }

  // Common UI actions can go here
  public async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
