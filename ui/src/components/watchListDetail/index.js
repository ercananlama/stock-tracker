import React, { useReducer, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import CustomTable from "../shared/table";

import getWatchlistDetail from "./getWatchlistDetail";
import reducer, { initalState } from "./reducer";

import requestStatus from "../../core/requestStatus";

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    marginTop: 10,
  },
}));

export default function EnhancedTable({ watchlistId }) {
  console.log(watchlistId);

  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    getWatchlistDetail({ dispatch, watchlistId });
  }, [watchlistId]);

  const isBusy = state.requestStatus === requestStatus.inProgress;
  const isFinished = state.requestStatus === requestStatus.finished;

  return (
    <>
      {isBusy && <CircularProgress className={classes.circularProgress} />}
      {isFinished && <CustomTable items={state.items} />}
    </>
  );
}
