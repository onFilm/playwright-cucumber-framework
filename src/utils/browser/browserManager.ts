import {chromium, firefox, webkit} from "playwright-core";
import { config } from "../setup/config";

export const invokeBrowser = () => {
  const browserType = process.env.BROWSER;
  switch (browserType) {
    case "chromium":
      return chromium.launch(config.browserOptions);
    case "firefox":
      return firefox.launch(config.browserOptions);
    case "webkit":
      return webkit.launch(config.browserOptions);
    default:
      throw new Error("Please set the proper browser!");
  }
};