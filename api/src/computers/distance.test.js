import { computeUpsidePotential, computeDownsidePotential } from "./distance.js";

describe("potential", () => {
  it("computeUpsidePotential", () => {
    expect(
      computeUpsidePotential({
        yearRangeHigh: 120,
        firstTarget: 110,
        lastPrice: 100,
      })
    ).toEqual(0.2);
    expect(
      computeUpsidePotential({
        yearRangeHigh: 110,
        firstTarget: 120,
        lastPrice: 100,
      })
    ).toEqual(0.2);
    expect(
      computeUpsidePotential({
        yearRangeHigh: 105,
        firstTarget: 80,
        lastPrice: 100,
      })
    ).toEqual(0.05);
  });

  it("computeDownsidePotential", () => {
    expect(
      computeDownsidePotential({
        yearRangeLow: 50,
        priceTargetLow: 70,
        lastPrice: 100,
      })
    ).toEqual(0.4);
    expect(
      computeDownsidePotential({
        yearRangeLow: 70,
        priceTargetLow: 50,
        lastPrice: 100,
      })
    ).toEqual(0.4);
    expect(
      computeDownsidePotential({
        yearRangeLow: 40,
        priceTargetLow: 80,
        lastPrice: 50,
      })
    ).toEqual(0.2);
  });
});
