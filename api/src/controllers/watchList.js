import createWatchListDataAccess from "../services/watchList/index.js";
import createStockDataCollector from "../services/stockDataCollector/index.js";
import applyComputers from "../computers/index.js";

import { runConcurrent } from "../utils/promiseHelper.js";

const watchListData = createWatchListDataAccess();

function getWatchList() {
  return watchListData.getWatchList();
}

function getStocksByWatchList(watchListId) {
  return watchListData.getStocksByWatchList(watchListId);
}

async function getStocksDetailsByWatchList(watchListId, order, direction) {
  let collector = null;
  try {
    collector = await createStockDataCollector().init();
    const stocksInWatchList = watchListData.getStocksByWatchList(watchListId);
    const stocksDetails = await runConcurrent(
      stocksInWatchList,
      2,
      collector.getStockDetails
    );
    let results = stocksDetails.map(applyComputers);
    if (order) {
      results = results.sort((a, b) => {
        if (direction === "asc") {
          return a[order] - b[order];
        }
        return b[order] - a[order];
      });
    }
    return results;
  } finally {
    if (collector) {
      collector.dispose();
    }
  }
}

export default {
    getWatchList, 
    getStocksByWatchList,
    getStocksDetailsByWatchList
};
