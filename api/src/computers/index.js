import { computeDistance } from "./distance.js";

export default (stockDetail) => {
  const distance = computeDistance(stockDetail);
  return {
    ...stockDetail,
    ...distance,
  };
};
