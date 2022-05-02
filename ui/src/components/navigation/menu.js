import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import pages from './pages';

const useStyles = makeStyles({
    list: {
        width: 250,
    }
});

const Menu = ({ open, onClose, onSelect }) => {

    const classes = useStyles();

    return (
        <Drawer open={open} onClose={onClose}>
            <div
                className={classes.list}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}>
                <List>
                    {pages.map(p =>
                        (
                            <ListItem button key={p.key} onClick={() => onSelect(p.key)}>
                                <ListItemIcon>{p.menuIcon}</ListItemIcon>
                                <ListItemText primary={p.label} />
                            </ListItem>
                        ))}
                </List>
            </div>
        </Drawer>
    );
}

export default Menu;