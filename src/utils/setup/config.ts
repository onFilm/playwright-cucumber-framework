import {LaunchOptions} from "@playwright/test";

const browserOptions: LaunchOptions = {
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
    "--use-fake-device-for-media-stream",
    "--disable-web-security",
    "--allow-insecure-localhost",],
  downloadsPath: "outputs",
  firefoxUserPrefs: {
    "media.navigator.streams.fake": true,
    "media.navigator.permission.disabled": true
  }
};

const browserOptionsHEADED: LaunchOptions = {
  headless: false,
  ...browserOptions
};

const browserOptionsHEADLESS: LaunchOptions = {
  headless: true,
  ...browserOptions
};

export const config = {
  browser: process.env.BROWSER || "chromium",
  browserOptions: process.env.HEADLESS === undefined ? browserOptionsHEADLESS : browserOptionsHEADED,
  BASE_URL: process.env.BASEURL || "https://google.com/",
  defaultTimeout: 80 * 1000, // milliseconds
  downloadsPath: "outputs"
};
