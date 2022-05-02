import { Router } from "express";

import controller from "../controllers/stock.js";

const router = Router();

router.get("/:symbol/details", async (req, res, next) => {
  const symbol = req.params.symbol;
  if (!symbol) {
    res.status(400).send("symbol is required");
  }

  try {
    const details = await controller.getDetailsBySymbol(symbol);
    res.send(details);
  } catch (err) {
    next(err);
  }
});

export default router;
