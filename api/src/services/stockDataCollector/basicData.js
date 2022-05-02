import {
  extractPercentageFromDailyChange,
  extractDividendAmount,
  extractDividendYield,
  extractPriceTargets,
  parseDecimal,
  parsePercentage,
  extractRange,
  extractMarketCap,
} from "./stockDataParser.js";
import { selectItems } from "./dataHelper.js";

function createItemsToSelect(symbol) {
  return {
    lastPrice: {
      selector: `fin-streamer[data-field="regularMarketPrice"][data-symbol="${symbol}"]`,
    },
    dailyChange: {
      selector: `fin-streamer[data-field="regularMarketChangePercent"][data-symbol="${symbol}"] > span`,
    },
    firstTarget: {
      selector: 'td[data-test="ONE_YEAR_TARGET_PRICE-value"]',
    },
    volume: {
      selector: 'fin-streamer[data-field="regularMarketVolume"]',
      getContent: function (page) {
        return page.$eval(this.selector, (i) => i.getAttribute("value"));
      },
    },
    marketCap: {
      selector: 'td[data-test="MARKET_CAP-value"]',
    },
    peRatioTTM: {
      selector: 'td[data-test="PE_RATIO-value"]',
    },
    epsTTM: {
      selector: 'td[data-test="EPS_RATIO-value"]',
    },
    earningsDate: {
      selector: 'td[data-test="EARNINGS_DATE-value"]',
    },
    dividendInfo: {
      selector: 'td[data-test="DIVIDEND_AND_YIELD-value"]',
    },
    dayRange: {
      selector: 'td[data-test="DAYS_RANGE-value"]',
    },
    yearRange: {
      selector: 'td[data-test="FIFTY_TWO_WK_RANGE-value"]',
    },
    priceTargets: {
      selector: 'section[data-test="price-targets"] > div',
      getContent: function (page) {
        return page.$eval(this.selector, (i) => i.getAttribute("aria-label"));
      },
      waitForSelector: async function (page) {
        await page.evaluate(() => {
          window.scrollBy(0, window.innerHeight);
        });
        await page.waitForSelector(this.selector);
      },
    },
    recommendRating: {
      selector: 'div[data-test="rec-rating-txt"]',
    },
  };
}

export default async (page, symbol) => {
  await page.goto(`https://finance.yahoo.com/quote/${symbol}`);

  const itemsToResults = await selectItems(page, createItemsToSelect(symbol));

  const dayRange = extractRange(itemsToResults.dayRange);
  const yearRange = extractRange(itemsToResults.yearRange);

  return {
    symbol: symbol,
    lastPrice: parseDecimal(itemsToResults.lastPrice),
    dailyChangePerc: parsePercentage(
      extractPercentageFromDailyChange(itemsToResults.dailyChange)
    ),
    firstTarget: parseDecimal(itemsToResults.firstTarget),
    volume: parseDecimal(itemsToResults.volume),
    marketCap: extractMarketCap(itemsToResults.marketCap),
    peRatioTTM: parseDecimal(itemsToResults.peRatioTTM),
    epsTTM: parseDecimal(itemsToResults.epsTTM),
    earningsDate: itemsToResults.earningsDate,
    dividendAmount: extractDividendAmount(itemsToResults.dividendInfo),
    dividendYield: parsePercentage(
      extractDividendYield(itemsToResults.dividendInfo)
    ),
    dayRangeLow: dayRange.first,
    dayRangeHigh: dayRange.second,
    yearRangeLow: yearRange.first,
    yearRangeHigh: yearRange.second,
    ...extractPriceTargets(itemsToResults.priceTargets),
    recommendRating: itemsToResults.recommendRating,
  };
};
