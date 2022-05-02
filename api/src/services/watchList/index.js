const watchListData = [
  {
    id: 1,
    name: "Core",
    stocks: ["MSFT", "AAPL"],
    isDefault: true,
  },
  {
    id: 2,
    name: "Tech",
    stocks: ["UBER", "PYPL"],
    isDefault: false,
  },
];

export default () => {
  return {
    getWatchList: () => {
      return watchListData;
    },
    getStocksByWatchList: (id) => {
      const item = watchListData.find((s) => s.id === id);
      if (!item) {
        throw new Error(`Unable to find watchlist by id:${id}`);
      }
      return item.stocks;
    },
  };
};
