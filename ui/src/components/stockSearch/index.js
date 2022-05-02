import React, { useState, useReducer } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';

import CustomTable from "../shared/table";

import getStockDetail from "./getStockDetail";
import reducer, { initalState } from "./reducer";

import requestStatus from "../../core/requestStatus";

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    marginTop: 10,
  },
}));

export default function StockSearch() {
  const [stock, setStock] = useState("AAPL");
  const [stockData, dispatch] = useReducer(reducer, initalState);
  const classes = useStyles();

  const find = () => {
    getStockDetail({ dispatch, stock });
  };

  const isBusy = stockData.requestStatus === requestStatus.inProgress;

  let items = null;
  if (stockData.requestStatus === requestStatus.finished && stockData.data) {
    items = [stockData.data];
  }

  return (
    <div className="alignCenter">
      <div>
        <TextField
          label="Stock code"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
          disabled={isBusy}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={find}
          disabled={isBusy}
        >
          Find
        </Button>
      </div>
      {isBusy && <CircularProgress className={classes.circularProgress} />}
      <div>{items && <CustomTable items={items} />}</div>
    </div>
  );
}
