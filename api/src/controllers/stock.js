import createStockDataCollector from "../services/stockDataCollector/index.js";
import applyComputers from "../computers/index.js";

async function getDetailsBySymbol(symbol) {
    let collector = null;
    try {
      collector = await createStockDataCollector().init();
      const stocksDetail = await collector.getStockDetails(symbol);
      const results = applyComputers(stocksDetail);
      return results;
    } finally {
      if (collector) {
        collector.dispose();
      }
    }
}

export default {
    getDetailsBySymbol
};
