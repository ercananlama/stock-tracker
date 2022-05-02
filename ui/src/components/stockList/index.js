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

export default function StockList() {
  const [stocks, setStocks] = useState("");
  const [stocksData, dispatch] = useReducer(reducer, initalState);
  const classes = useStyles();

  const add = () => {
    getStockDetail({ dispatch, stocks: stocks.split('\n') });
  };

  const isBusy = stocksData.requestStatus === requestStatus.inProgress;

  return (
    <div className="alignCenter">
      <div>
        <TextField
          label="Stock code"
          multiline
          rowsMax={10}
          value={stocks}
          onChange={(event) => setStocks(event.target.value)}
          disabled={isBusy}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={add}
          disabled={isBusy}
        >
          Add
        </Button>
      </div>
      {isBusy && <CircularProgress className={classes.circularProgress} />}
      <div>{stocksData.items.length > 0 && <CustomTable items={stocksData.items} />}</div>
    </div>
  );
}