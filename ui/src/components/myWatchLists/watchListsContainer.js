import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

import MyWatchLists from './index';
import WatchListDetail from '../watchListDetail';

import getMyWatchLists from './getMyWatchlists';
import reducer, { initalState } from './reducer';

import requestStatus from '../../core/requestStatus';

const useStyles = makeStyles((theme) => ({
    circularProgress: {
        marginTop: 10,
    },
}));

const WatchListsContainer = () => {

    const [state, dispatch] = useReducer(
        reducer,
        initalState
    );
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        getMyWatchLists({ dispatch });
    }, []);

    if (state.requestStatus === requestStatus.inProgress || state.requestStatus === requestStatus.notStarted) {
        return <CircularProgress className={classes.circularProgress}/>;
    }

    let selectedWatchListId = null;
    if (!id) {
        selectedWatchListId = state.items.find(i => i.isDefault).id;
    }
    else {
        selectedWatchListId = parseInt(id);
    }

    return (
        <div className="alignCenter">
            <div>
                <MyWatchLists watchLists={state.items} selectedWatchListId={selectedWatchListId} dispatch={dispatch} />
            </div>
            <div>
                <WatchListDetail watchlistId={selectedWatchListId} />
            </div>
        </div>
    );
};

export default WatchListsContainer;