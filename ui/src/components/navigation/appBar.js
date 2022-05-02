import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Menu from './menu';
import { getPage, getPageByPath } from './pages';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

const CustomAppBar = (props) => {

    let history = useHistory();
    const activePage = getPageByPath(history.location.pathname);
    const classes = useStyles();

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = (isOpen) => {
        setMenuOpen(isOpen);
    };

    const selectMenu = (key) => {
        const page = getPage(key);
        history.push(page.url);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleMenu(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {activePage.label}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Menu open={menuOpen} onClose={() => toggleMenu(false)} onSelect={selectMenu} />
        </>
    );

}

export default CustomAppBar;