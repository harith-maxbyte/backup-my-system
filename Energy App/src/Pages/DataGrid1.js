import React from "react";
import moment from 'moment';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";

function DataGrid1() {
    let useData = [];

    let selectedButton = useSelector(state => { return state.loggedReducer.btn });
    let shiftDay = useSelector(state => { return state.loggedReducer.shiftdaily });
    let shiftWeek = useSelector(state => { return state.loggedReducer.shiftweekly });
    let shiftMonth = useSelector(state => { return state.loggedReducer.shiftmonthly });
    let shiftYear = useSelector(state => { return state.loggedReducer.shiftyearly });
    let shiftCustom = useSelector(state => { return state.loggedReducer.shiftcustomly });

    if (selectedButton === "Day") {
        useData = shiftDay
    }
    if (selectedButton === "Week") {
        useData = shiftWeek
    }
    if (selectedButton === "Month") {
        useData = shiftMonth
    }
    if (selectedButton === "Year") {
        useData = shiftYear
    }
    if (selectedButton === "Custom") {
        useData = shiftCustom
    }
    return (  
        <React.Fragment>
            <TableContainer component={Paper}
                sx={{
                    maxHeight: 295
                }}>
                <Table aria-label="simple table" stickyHeader
                    sx={{
                        height: "max-content"
                    }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: "600", fontSize: "12px", color: "black" }}>Date</TableCell>
                            <TableCell align="center" style={{ fontWeight: "600", fontSize: "12px", color: "black" }}>Shift</TableCell>
                            <TableCell align="center" style={{ fontWeight: "600", fontSize: "12px", color: "black" }}>Energy Consumption(kWh)</TableCell>
                            <TableCell align="center" style={{ fontWeight: "600", fontSize: "12px", color: "black" }}>Cumulative Energy(kWh)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {useData.map((row, i) => (
                            <TableRow key={i}>
                                {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                                <TableCell align="center">{moment(row.edate).format('Do MMM YYYY')}</TableCell>
                                <TableCell align="center">{row.shiftName}</TableCell>
                                <TableCell align="center">{row.shiftEnergyVal.toFixed(2)}</TableCell>
                                <TableCell align="center">{row.cumEnergyVal.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default React.memo(DataGrid1);
