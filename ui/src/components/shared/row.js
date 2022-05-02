import React, { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import headCells, { formatter, marketCapFormatter } from './columnConfig';

const createTableCell = (col, row) => {

    function getDescendantProp(obj, desc) {
        var arr = desc.split(".");
        while (arr.length && (obj = obj[arr.shift()]));
        return obj;
    }

    let val = getDescendantProp(row, col.dataKey);
    if (col.percentage) {
        val = val * 100;
    }
    if (col.formatter) {
        val = col.formatter.format(val);
    }
    if (col.key) {
        return <TableCell component="th" scope="row">{val}</TableCell>;
    }
    else {
        return <TableCell align="right">{val}</TableCell>;
    }
};

const Row = (props) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow
                hover
                tabIndex={-1}
                key={props.row.symbol}
            >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {headCells.map(c => createTableCell(c, props.row))}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={headCells.length + 1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Data
                            </Typography>
                            <Table size="small" aria-label="data">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Market cap (B)</TableCell>
                                        <TableCell align="right">Dividend yield (%)</TableCell>
                                        <TableCell align="right">Day range (Low)</TableCell>
                                        <TableCell align="right">Day range (High)</TableCell>
                                        <TableCell align="right">Distance from year high (%)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={props.row.symbol}>
                                        {createTableCell({ dataKey: 'marketCap', formatter: marketCapFormatter }, props.row)}
                                        {createTableCell({ dataKey: 'dividendYield', percentage: true, formatter: formatter }, props.row)}
                                        {createTableCell({ dataKey: 'dayRangeLow', formatter: formatter }, props.row)}
                                        {createTableCell({ dataKey: 'dayRangeHigh', formatter: formatter }, props.row)}
                                        {createTableCell({ dataKey: 'distanceFromYearHigh', percentage: true, formatter: formatter }, props.row)}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Technical indicators
                            </Typography>
                            <Table size="small" aria-label="data">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Moving average 50d</TableCell>
                                        <TableCell align="right">Moving average 200d</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={props.row.symbol}>
                                        {createTableCell({ dataKey: 'movingAverage50day', formatter: formatter }, props.row)}
                                        {createTableCell({ dataKey: 'movingAverage200day', formatter: formatter }, props.row)}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
};

export default Row;