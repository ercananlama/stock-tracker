import React from 'react';

import { matchPath } from "react-router";

import StockSearch from '../stockSearch';
import WatchListsContainer from '../myWatchLists/watchListsContainer';
import StockList from '../stockList';

import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List';

const pages = [
    {
        key: 'stockSearch',
        label: 'Stock search',
        path: '/',
        exact: true,
        renderContent: () => <StockSearch/>,
        url: '/',
        menuIcon: <SearchIcon/>
    },
    {
        key: 'watchlists',
        label: 'Watchlists',
        path: '/watchList/:id?',
        renderContent: () => <WatchListsContainer/>,
        url: '/watchList',
        menuIcon: <ListIcon/>
    },
    {
        key: 'stockList',
        label: 'Stock list',
        path: '/stocklist',
        renderContent: () => <StockList/>,
        url: '/stocklist',
        menuIcon: <ListIcon/>
    }
];

export const getPage = (key) => {
    return pages.find(p => p.key === key);
};

export const getPageByPath = (pathname) => {
    return pages.find(p => matchPath(pathname, { path: p.path, exact: p.exact }) != null);
};

export default pages;