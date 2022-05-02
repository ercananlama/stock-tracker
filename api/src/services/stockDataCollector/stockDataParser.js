export const extractPercentageFromDailyChange = (data) => {
  const regex = /\(([\+?\-?\d\.\%]+)\)/;
  const result = data.match(regex);
  if (result && result.length > 1) {
    return result[1];
  }
  return result[1];
};

export const extractCurrency = (data) => {
  const token = "Currency in";
  return data.substr(data.indexOf(token) + token.length).trim();
};

export const extractDividendAmount = (data) => {
  const token = "(";
  return data.substr(0, data.indexOf(token)).trim();
};

export const extractDividendYield = (data) => {
  const result = data.substr(data.indexOf("(") + 1);
  return result.substr(0, result.indexOf(")"));
};

export const extractPriceTargets = (data) => {
  const extract = (str, startWord, endWord) => {
    const startIndex = str.indexOf(startWord) + startWord.length;
    return str
      .substr(
        startIndex,
        endWord ? str.indexOf(endWord) - startIndex : undefined
      )
      .trim();
  };
  return {
    priceTargetLow: parseDecimal(extract(data, "Low", "Current")),
    priceTargetAvg: parseDecimal(extract(data, "Average", "High")),
    priceTargetHigh: parseDecimal(extract(data, "High")),
  };
};

export const parseDecimal = (val) => {
  return Number(val.replace(/[^0-9.-]+/g, ""));
};

export const parsePercentage = (val) => {
  return Number(val.replace(/[^0-9.-]+/g, "")) / 100;
};

export const extractRange = (data) => {
  const parts = data.split("-");
  return {
    first: parseDecimal(parts[0].trim()),
    second: parseDecimal(parts[1].trim()),
  };
};

export const extractMarketCap = (data) => {
  const symbolBillion = "B";
  const symbolTrillion = "T";
  if (data.endsWith(symbolTrillion)) {
    return Number(data.replace(symbolTrillion, "")) * 1000;
  } else if (data.endsWith(symbolBillion)) {
    return Number(data.replace(symbolBillion, ""));
  }
  return "N/A";
};
