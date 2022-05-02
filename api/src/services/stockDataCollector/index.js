import puppeteer from "puppeteer";

import { logTrace } from "../../utils/logger.js";
import getBasicData from "./basicData.js";

const acceptConsent = async (browser) => {
  const page = await browser.newPage();
  await setupPageSettings(page);
  await page.goto(`https://finance.yahoo.com/`);
  // accept consent
  if (page.url().indexOf("consent.yahoo.com") > -1) {
    await page.click('button[name="agree"]');
  }
};

const setupPageSettings = async (page) => {
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.setRequestInterception(true);
  const blockedResources = [
    "image",
    "media",
    "font",
    "texttrack",
    "object",
    "imageset",
    "other",
  ];
  const blockedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".html"
  ];
  // optimize to speed up page loading
  page.on("request", (request) => {
    const type = request.resourceType();
    const url = request.url();
    if (blockedResources.includes(type) || blockedExtensions.some(ext => url.includes(ext))){
      request.abort();
    }
    else {
      request.continue();
    }
  });
};

export default () => {
  return {
    init: async () => {
      const browser = await puppeteer.launch({
        args: ["--start-maximized"],
        defaultViewport: null,
      });
      await acceptConsent(browser);
      return {
        dispose: async () => {
          await browser.close();
        },
        getStockDetails: async (symbol) => {
          logTrace(`Fetching details of ${symbol}`);
          const page = await browser.newPage();
          await setupPageSettings(page);
          const dataToFetch = [getBasicData];
          let result = {};
          for (const i in dataToFetch) {
            const data = await dataToFetch[i](page, symbol);
            result = {
              ...result,
              ...data,
            };
          }
          logTrace(`Details of ${symbol}`, result);
          await page.close();
          return result;
        },
      };
    },
  };
};
