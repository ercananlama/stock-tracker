import requestStatus from "../../core/requestStatus";

export const GET_STOCK_DETAIL_REQUEST = "GET_STOCK_DETAIL_REQUEST";
export const GET_STOCK_DETAIL_SUCCESS = "GET_STOCK_DETAIL_SUCCESS";
export const GET_STOCK_DETAIL_FAILURE = "GET_STOCK_DETAIL_FAILURE";
export const GET_STOCK_DETAIL_FINISHED = 'GET_STOCK_DETAIL_FINISHED';

export const initalState = {
  items: [],
  requestStatus: requestStatus.notStarted,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_STOCK_DETAIL_REQUEST:
      return {
        ...state,
        requestStatus: requestStatus.inProgress,
      };
    case GET_STOCK_DETAIL_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case GET_STOCK_DETAIL_FINISHED:
      return {
        ...state,
        requestStatus: requestStatus.finished,
      };
    case GET_STOCK_DETAIL_FAILURE:
      return {
        ...state,
        requestStatus: requestStatus.failed,
      };
    default:
      return state;
  }
};
