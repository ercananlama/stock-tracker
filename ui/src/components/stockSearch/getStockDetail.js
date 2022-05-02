import * as axios from "axios";

import config from "../../core/config";

import {
  GET_STOCK_DETAIL_REQUEST,
  GET_STOCK_DETAIL_SUCCESS,
  GET_STOCK_DETAIL_FAILURE,
} from "./reducer";

const getStockDetail = async ({ dispatch, stock }) => {
  dispatch({ type: GET_STOCK_DETAIL_REQUEST });
  try {
    const response = await axios({
      url: `${config.apiHost}/stock/${stock}/details`,
      method: "get",
    });
    dispatch({ type: GET_STOCK_DETAIL_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: GET_STOCK_DETAIL_FAILURE });
  }
};

export default getStockDetail;
