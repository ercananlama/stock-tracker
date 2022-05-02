import {
  extractPercentageFromDailyChange,
  extractCurrency,
  parseDecimal,
  parsePercentage,
  extractRange,
  extractMarketCap,
} from "./stockDataParser.js";

describe("stockDataParser", () => {
  it("can extract daily change as percentage when change is positive", () => {
    const perc = extractPercentageFromDailyChange("+41.27 (+1.72%)");
    expect(perc).toEqual("+1.72%");
  });

  it("can extract daily change as percentage when change is negative", () => {
    const perc = extractPercentageFromDailyChange("-0.37 (-0.16%)");
    expect(perc).toEqual("-0.16%");
  });

  it("can extract daily change as percentage when change is neutral", () => {
    const perc = extractPercentageFromDailyChange("0.0000 (0.00%)");
    expect(perc).toEqual("0.00%");
  });

  it("can extract currency", () => {
    const curr = extractCurrency(
      "NasdaqGS - NasdaqGS Real Time Price. Currency in USD"
    );
    expect(curr).toEqual("USD");
  });

  it("can parse decimal", () => {
    expect(parseDecimal("3,284.72")).toEqual(3284.72);
  });

  it("can parse percentage", () => {
    expect(parsePercentage("-0.38%")).toEqual(-0.0038);
    expect(parsePercentage("+3.01%")).toEqual(0.0301);
  });

  it("can extract range", () => {
    expect(extractRange("3,275.39 - 3,314.40")).toEqual({
      first: 3275.39,
      second: 3314.4,
    });
  });

  it("can extract market cap", () => {
    expect(extractMarketCap("816.243B", 816243));
    expect(extractMarketCap("1.639T", 1639000));
  });
});
