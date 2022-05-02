import requestStatus from "../../core/requestStatus";

export const GET_STOCK_DETAIL_REQUEST = "GET_STOCK_DETAIL_REQUEST";
export const GET_STOCK_DETAIL_SUCCESS = "GET_STOCK_DETAIL_SUCCESS";
export const GET_STOCK_DETAIL_FAILURE = "GET_STOCK_DETAIL_FAILURE";

export const initalState = {
  data: {},
  requestStatus: requestStatus.notStarted,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_STOCK_DETAIL_REQUEST:
      return {
        requestStatus: requestStatus.inProgress,
      };
    case GET_STOCK_DETAIL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        requestStatus: requestStatus.finished,
      };
    case GET_STOCK_DETAIL_FAILURE:
      return {
        requestStatus: requestStatus.failed,
      };
    default:
      return state;
  }
};
