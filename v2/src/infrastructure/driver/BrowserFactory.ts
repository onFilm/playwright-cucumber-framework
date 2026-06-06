import { Browser, BrowserContext, Page, chromium, firefox, webkit } from 'playwright-core';
import { ConfigManager } from '../config/ConfigManager';
import { singleton } from 'tsyringe';

@singleton()
export class BrowserFactory {
  private browser: Browser | null = null;
  private contexts = new Map<string, BrowserContext>();

  public async launchBrowser(): Promise<Browser> {
    if (this.browser) return this.browser;

    const { BROWSER } = ConfigManager.config;
    const options = ConfigManager.browserOptions;

    switch (BROWSER) {
      case 'firefox':
        this.browser = await firefox.launch(options);
        break;
      case 'webkit':
        this.browser = await webkit.launch(options);
        break;
      case 'chromium':
      default:
        this.browser = await chromium.launch(options);
        break;
    }
    return this.browser;
  }

  public async createBrowserContext(scenarioId: string, testName: string): Promise<BrowserContext> {
    const browser = await this.launchBrowser();
    const harsDir = "artifacts/hars/";
    const videoDir = "artifacts/videos/";

    const context = await browser.newContext({
      recordHar: { path: `${harsDir}${testName}_${scenarioId}.har`, urlFilter: "**/apod/**" },
      recordVideo: { dir: videoDir },
      strictSelectors: false,
      acceptDownloads: true,
      viewport: null
    });

    this.contexts.set(scenarioId, context);
    return context;
  }

  public async getPage(scenarioId: string): Promise<Page> {
    const context = this.contexts.get(scenarioId);
    if (!context) throw new Error(`BrowserContext not found for scenario: ${scenarioId}`);
    
    const pages = context.pages();
    if (pages.length > 0) return pages[0];
    
    return await context.newPage();
  }

  public async closeContext(scenarioId: string): Promise<void> {
    const context = this.contexts.get(scenarioId);
    if (context) {
      await context.close();
      this.contexts.delete(scenarioId);
    }
  }

  public async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
