import { Router } from "express";

import controller from "../controllers/watchList.js";

const router = Router();

router.get("/", function (req, res, next) {
  try {
    const data = controller.getWatchList();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:watchListId/stocks", function (req, res, next) {
  try {
    const watchListId = req.params.watchListId;
    if (!watchListId || isNaN(watchListId)) {
      res.status(400).send("Missing or invalid watchListId");
      return;
    }

    const data = controller.getStocksByWatchList(parseInt(watchListId));
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:watchListId/stocks/details", async (req, res, next) => {
  try {
    const { order, direction } = req.query;

    const watchListId = req.params.watchListId;
    if (!watchListId || isNaN(watchListId)) {
      res.status(400).send("Missing or invalid watchListId");
      return;
    }

    const data = await controller.getStocksDetailsByWatchList(
      parseInt(watchListId),
      order,
      direction
    );
    res.send(data);
  } catch (err) {
    next(err);
  }
});

export default router;
