import React from 'react';

import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import { selectWatchlist } from './reducer';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 150
    }
}));

const MyWatchLists = ({ watchLists, selectedWatchListId, dispatch }) => {

    let history = useHistory();
    const classes = useStyles();

    const handleListItemClick = (event) => {
        const id = event.target.value;
        selectWatchlist({ dispatch, id });
        history.push(`/watchList/${id}`);
    };

    const renderWatchList = (watchList) =>
        <option key={watchList.id} value={watchList.id}>{watchList.name}</option>

    return (
        <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="watchList-select">My Watchlists</InputLabel>
            <Select
                native
                value={selectedWatchListId}
                onChange={handleListItemClick}
                inputProps={{
                    name: 'watchList',
                    id: 'watchList-select',
                }}
            >
                {watchLists.map((watchList) => renderWatchList(watchList))}
            </Select>
        </FormControl>
    );
};

export default MyWatchLists;