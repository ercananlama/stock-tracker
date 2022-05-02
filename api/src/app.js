import express from "express";
import morgan from "morgan";
import cors from "cors";

import indexRouter from "./routes/index.js";
import stockRouter from "./routes/stock.js";
import watchListRouter from "./routes/watchList.js";

function createApp() {
  const app = express();
  setMiddlewares(app);
  setRoutes(app);
  return app;
}

function setMiddlewares(app) {
  const defaultCorsOptions = {
    origin: (req, callback) => {
      callback(null, true);
    },
  };
  app.use("*", cors(defaultCorsOptions));
  app.use(morgan("combined"));
}

function setRoutes(app) {
  app.use("/", indexRouter);
  app.use("/stock", stockRouter);
  app.use("/watchList", watchListRouter);
}

export default createApp;
