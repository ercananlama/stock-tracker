import * as axios from 'axios';

import config from '../../core/config';

import {
    MY_WATCHLISTS_REQUEST,
    MY_WATCHLISTS_SUCCESS,
    MY_WATCHLISTS_FAILURE
} from './reducer';

const getMyWatchlist = async ({dispatch}) => {
    dispatch({type: MY_WATCHLISTS_REQUEST});
    try {
        const response = await axios({
            url: `${config.apiHost}/watchList`,
            method: "get"
        });
        dispatch({type: MY_WATCHLISTS_SUCCESS, payload: response.data});
    } catch (e) {
        dispatch({type: MY_WATCHLISTS_FAILURE});
    }
};

export default getMyWatchlist;