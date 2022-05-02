import * as axios from 'axios';

import config from '../../core/config';

import {
    GET_WATCHLIST_DETAIL_REQUEST,
    GET_WATCHLIST_DETAIL_SUCCESS,
    GET_WATCHLIST_DETAIL_FAILURE
} from './reducer';

const getWatchlistDetail = async ({ dispatch, watchlistId }) => {
    dispatch({ type: GET_WATCHLIST_DETAIL_REQUEST });
    try {
        const response = await axios({
            url: `${config.apiHost}/watchList/${watchlistId}/stocks/details`,
            method: 'get'
        });
        dispatch({type: GET_WATCHLIST_DETAIL_SUCCESS, payload: response.data});
    } catch (e) {
        dispatch({ type: GET_WATCHLIST_DETAIL_FAILURE });
    }
};

export default getWatchlistDetail;