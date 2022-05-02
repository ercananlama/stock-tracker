import * as axios from "axios";

import config from "../../core/config";

import {
  GET_STOCK_DETAIL_REQUEST,
  GET_STOCK_DETAIL_SUCCESS,
  GET_STOCK_DETAIL_FAILURE,
  GET_STOCK_DETAIL_FINISHED,
} from "./reducer";

const getStockDetail = ({ dispatch, stocks }) => {
  dispatch({ type: GET_STOCK_DETAIL_REQUEST });
  try {
    fetchData({ dispatch, stocks });
  } catch (e) {
    dispatch({ type: GET_STOCK_DETAIL_FAILURE });
  }
};

const fetchData = ({ dispatch, stocks }) => {

  const fetchNext = (stockList) => {
    if (stockList.length > 1) {
      fetchData({ dispatch, stocks: stockList.slice(1) });
    } else {
      dispatch({ type: GET_STOCK_DETAIL_FINISHED });
    }
  };

  axios.get(`${config.apiHost}/stock/${stocks[0]}/details`)
  .then((response) => {
    dispatch({ type: GET_STOCK_DETAIL_SUCCESS, payload: response.data });
  })
  .catch(() => {
    dispatch({ type: GET_STOCK_DETAIL_FAILURE });
  })
  .then(() => {
    fetchNext(stocks);
  });
};

export default getStockDetail;
