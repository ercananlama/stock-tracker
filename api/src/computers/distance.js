import { computeAvg } from "../utils/formatting.js";

export const computeDistance = (stockDetail) => {
  return {
    distanceFromYearHigh:
      (stockDetail.yearRangeHigh - stockDetail.lastPrice) /
      stockDetail.yearRangeHigh,
    distanceFromYearLow:
      (stockDetail.lastPrice - stockDetail.yearRangeLow) /
      stockDetail.yearRangeLow,
    upsidePotential: computeUpsidePotential(stockDetail),
    upsidePotentialByTargets: computeUpsidePotentialByTargets(stockDetail),
    downsidePotential: computeDownsidePotential(stockDetail),
  };
};

export const computeUpsidePotential = (stockDetail) => {
  return (
    (Math.max(stockDetail.yearRangeHigh, stockDetail.firstTarget) -
      stockDetail.lastPrice) /
    stockDetail.lastPrice
  );
};

export const computeUpsidePotentialByTargets = (stockDetail) => {
  if (stockDetail.lastPrice > stockDetail.firstTarget) {
    return 0;
  }
  return (
    (stockDetail.firstTarget - stockDetail.lastPrice) / stockDetail.lastPrice
  );
};

export const computeDownsidePotential = (stockDetail) => {
  let downsidePotentialAmount =
    stockDetail.lastPrice -
    computeAvg([stockDetail.yearRangeLow, stockDetail.priceTargetLow]);
  if (downsidePotentialAmount < 0) {
    downsidePotentialAmount = stockDetail.lastPrice - stockDetail.yearRangeLow;
  }
  return downsidePotentialAmount / stockDetail.lastPrice;
};
