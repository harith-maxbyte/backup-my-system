import React from "react";
import moment from 'moment';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";

function DataGrid() {
    let useData = [];

    let selectedButton = useSelector(state => { return state.loggedReducer.btn });
    let energyDay = useSelector(state => { return state.loggedReducer.energydaily });
    let energyWeek = useSelector(state => { return state.loggedReducer.energyweekly });
    let energyMonth = useSelector(state => { return state.loggedReducer.energymonthly });
    let energyYear = useSelector(state => { return state.loggedReducer.energyyearly });
    let energyCustom = useSelector(state => { return state.loggedReducer.energycustomly });

    if (selectedButton === "Day") {
        useData = energyDay
    }
    if (selectedButton === "Week") {
        useData = energyWeek
    }
    if (selectedButton === "Month") {
        useData = energyMonth
    }
    if (selectedButton === "Year") {
        useData = energyYear
    }
    if (selectedButton === "Custom") {
        useData = energyCustom
    }

    return (
        <React.Fragment>
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 295
                }}
            >
                <Table
                    aria-label="simple table"
                    stickyHeader
                    sx={{
                        height: "max-content"
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: "600", fontSize: "12px", color: "black" }}>Date</TableCell>
                            <TableCell align="center" style={{ fontWeight: "600", fontSize: "12px", color: "black" }}>Energy Consumption(kWh)</TableCell>
                            <TableCell align="center" style={{ fontWeight: "600", fontSize: "12px", color: "black" }}>Month Consumption(kWh)</TableCell>
                            <TableCell align="center" style={{ fontWeight: "600", fontSize: "12px", color: "black" }}>Cumulative Energy(kWh)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {useData.map((row, i) => (
                            <TableRow key={i}>
                                {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                                <TableCell align="center">{moment(row.previousDt).format('Do MMM YYYY')}</TableCell>
                                <TableCell align="center">{row.energyConsumption.toFixed(2)}</TableCell>
                                <TableCell align="center">{row.cumEnergyVal.toFixed(2)}</TableCell>
                                <TableCell align="center">{row.monthConsumption.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default React.memo(DataGrid);