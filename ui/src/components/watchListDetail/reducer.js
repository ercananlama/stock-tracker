import requestStatus from '../../core/requestStatus';

export const GET_WATCHLIST_DETAIL_REQUEST = 'GET_WATCHLIST_DETAIL_REQUEST';
export const GET_WATCHLIST_DETAIL_SUCCESS = 'GET_WATCHLIST_DETAIL_SUCCESS';
export const GET_WATCHLIST_DETAIL_FAILURE = 'GET_WATCHLIST_DETAIL_FAILURE';

export const initalState = {
    items: [],
    requestStatus: requestStatus.notStarted,
};

export default (state = initalState, action) => {
    switch (action.type) {
        case GET_WATCHLIST_DETAIL_REQUEST:
            return {
                requestStatus: requestStatus.inProgress
            };
        case GET_WATCHLIST_DETAIL_SUCCESS:
            return {
                ...state,
                items: action.payload,
                requestStatus: requestStatus.finished,
            };
        case GET_WATCHLIST_DETAIL_FAILURE:
            return {
                requestStatus: requestStatus.failed
            };
        default:
            return state;
    }
};