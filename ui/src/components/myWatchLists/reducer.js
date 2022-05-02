import requestStatus from '../../core/requestStatus';

export const MY_WATCHLISTS_REQUEST = 'MY_WATCHLISTS_REQUEST';
export const MY_WATCHLISTS_SUCCESS = 'MY_WATCHLISTS_SUCCESS';
export const MY_WATCHLISTS_FAILURE = 'MY_WATCHLISTS_FAILURE';
export const SELECT_WATCHLIST = 'SELECT_WATCHLIST';

export const initalState = {
    items: [],
    requestStatus: requestStatus.notStarted,
    selectedId: null
};

export default (state = initalState, action) => {
    switch (action.type) {
        case MY_WATCHLISTS_REQUEST:
            return {
                requestStatus: requestStatus.inProgress
            };
        case MY_WATCHLISTS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                requestStatus: requestStatus.finished,
            };
        case MY_WATCHLISTS_FAILURE:
            return {
                requestStatus: requestStatus.failed
            };
        case SELECT_WATCHLIST:
            return {
                ...state,
                selectedId: action.payload
            };
        default:
            return state;
    }
};

export const selectWatchlist = ({dispatch, id}) => dispatch({type: SELECT_WATCHLIST, payload: id});