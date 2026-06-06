import { z } from "zod";
import * as dotenv from "dotenv";
import { LaunchOptions } from "playwright-core";
import { resolve } from "path";

// Load the appropriate environment file based on ENV var, defaulting to stable
const envFile = `.env.${process.env.ENV || "stable"}`;
dotenv.config({ path: resolve(process.cwd(), "src/utils/env", envFile) });

// Fallback logic for backwards compatibility with the existing .env loading in env.ts
if (!process.env.BASEURL) {
  // If not found in src/utils/env, try loading from root or other defaults
  dotenv.config({ path: resolve(process.cwd(), envFile) });
}

// Zod Schema to strictly validate process.env
const ConfigSchema = z.object({
  ENV: z.string().default("stable"),
  BROWSER: z.enum(["chromium", "firefox", "webkit"]).default("chromium"),
  HEADLESS: z.string().default("true").transform(val => val === "true"),
  BASEURL: z.string().url().default("https://www.saucedemo.com/"),
  APIURL: z.string().url().optional(),
  DEFAULT_TIMEOUT: z.string().default("80000").transform(Number),
  PWDEBUG: z.string().optional()
});

export type AppConfig = z.infer<typeof ConfigSchema>;

class ConfigurationManager {
  public readonly config: AppConfig;
  public readonly browserOptions: LaunchOptions;

  constructor() {
    // Parse and validate environment variables
    const parsed = ConfigSchema.safeParse(process.env);
    
    if (!parsed.success) {
      console.error("❌ Invalid environment configuration:", parsed.error.format());
      throw new Error("Environment configuration validation failed");
    }

    this.config = parsed.data;

    const baseBrowserOptions: LaunchOptions = {
      slowMo: 0,
      args: [
        "--window-size=1920,1080",
        "--start-maximized",
        "--enable-automation",
        "--disable-extensions",
        "--no-sandbox",
        "--incognito",
        "--disable-dev-shm-usage",
        "--disable-infobars",
        "--disable-browser-side-navigation",
        "--whitelisted-ips",
        "--disable-gpu",
        "--use-fake-ui-for-media-stream",
        "--use-fake-device-for-media-stream"
      ],
      downloadsPath: "outputs",
      firefoxUserPrefs: {
        "media.navigator.streams.fake": true,
        "media.navigator.permission.disabled": true
      }
    };

    this.browserOptions = {
      ...baseBrowserOptions,
      headless: this.config.HEADLESS
    };
  }
}

// Export a singleton instance
export const ConfigManager = new ConfigurationManager();
