import { Grid, Paper, Card } from '@mui/material';
import { makeStyles } from '@mui/styles';
import on from "../assets/images/svg/on.svg"
import off from "../assets/images/svg/off.svg"
import { memo, useEffect, useState } from 'react';
import { EnergyMonthly, ShiftDaily } from '../store/actions/index'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { START_TIME, END_TIME } from "../Helpers/Constatnt"
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    topbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        marginBottom: "3rem",
        background: "#F4CC44",
    },
    imgdiv: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: "3%"
    },
    img: {
        marginLeft: "2%",
        maxWidth: "6%"
    },
    firstcard: {
        display: "flex",
        flexDirection: "column",
        borderRadius: 16,
        textIndent: 10,
        padding: 5,
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },
    beforedevicename: {
        display: "flex",
        fontWeight: 500,
        alignItems: "center"
    },
    secondcard: {
        background: "#FEC9B4",
        transition: "background 1s ease-out",
        margin: 10,
        padding: 10,
        borderRadius: 16
    },
    opt: {
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: "15px",
        lineHeight: 2
    },
})

function MainDevice() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [energy, setEnergy] = useState(0)

    useEffect(() => {
        dispatch(EnergyMonthly())
        dispatch(ShiftDaily())
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let energymonth = useSelector(state => { return state.loggedReducer.energymonthly });
    let shiftDailyData = useSelector(state => { return state.loggedReducer.shiftdaily });


    const loadData = () => {
        axios.get(`https://janaaticsfunctionapp.azurewebsites.net/api/GetTimeSeriesData?code=5rUZrumKciSJ7bfhQjR38Qxkk7nUhTNR63phSsDHQOyRCisQ3CeuBA==&deviceid=EWON_FLEXY103&startTime=${START_TIME}&endTime=${END_TIME}`)
            .then(v => {
                for (var i = 0; i < 1; i++) {
                    setEnergy(JSON.parse(v.data.pop().data).Energy)
                }
            })
    }

    var todayconsume = 0;
    for (var i in shiftDailyData) {
        todayconsume += shiftDailyData[i].shiftEnergyVal;
    }


    var monthcons = energymonth.filter(function (obj) {
        if ('cumEnergyVal' in obj) {
            return true;
        } else {
            return false;
        }
    }).map(function (obj) { return obj['cumEnergyVal']; });

    let month = monthcons[monthcons.length - 1]

    return (
        <>
            <Paper className={classes.topbar}>
                <span style={{ fontWeight: 600, fontSize: "20px" }}>Energy Monitoring</span>
                <div className={classes.imgdiv}>
                    <img src={on} className={classes.img} alt="on" />ON
                    <img src={off} className={classes.img} alt="off" />OFF
                </div>
            </Paper>

            <Grid container spacing={5}>
                {[...Array(5)].map((x, i) =>
                    <Grid item xs={12} sm={12} md={4} key={i}>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/energy-meter-dashboard">
                            <Card className={classes.firstcard}>
                                <div className={classes.beforedevicename}> <img src={on} className={classes.img} alt="on"></img>LASER BAR CODE PRINTER</div>
                                <Card className={classes.secondcard}>
                                    <div className={classes.opt}>
                                        <span>Power KWH Start</span>
                                        <span>{energy} Unit</span>
                                    </div>
                                    <div className={classes.opt}>
                                        <span>Power KWH</span>
                                        <span>{energy} Unit</span>
                                    </div>
                                    <div className={classes.opt}>
                                        <span>Total Energy Consumption</span>
                                        <span>{todayconsume.toFixed(2)} Unit</span>
                                    </div>
                                    <div className={classes.opt}>
                                        <span>Month Energy Consumption</span>
                                        <span>{month} Unit</span>
                                    </div>
                                </Card>
                            </Card>
                        </Link>
                    </Grid>
                )}
            </Grid>
        </>
    )
}

export default memo(MainDevice);