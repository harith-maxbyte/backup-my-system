import { Grid, Paper, Card } from '@mui/material';
import { makeStyles } from '@mui/styles';
import on from "../assets/images/svg/on.svg"
import off from "../assets/images/svg/off.svg"
import { memo, useEffect, useState } from 'react';
import { DeviceList, EnergyMonthly, ShiftDaily } from '../store/actions/index'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { START_TIME, END_TIME } from "../Helpers/Constatnt"
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    const [status, setStatus] = useState([])
    const [device, setDevice] = useState([])
    const [energy, setEnergy] = useState([])

    useEffect(() => {

        let unmounted = false
        if (!unmounted) {
            dispatch(DeviceList())
            dispatch(EnergyMonthly(localStorage.getItem("Device")))
            dispatch(ShiftDaily(localStorage.getItem("Device")))
        }
        return () => { unmounted = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let DeviceDetails = useSelector(state => { return state.loggedReducer.device });
    let energymonth = useSelector(state => { return state.loggedReducer.energymonthly });
    let shiftDailyData = useSelector(state => { return state.loggedReducer.shiftdaily });


    useEffect(() => {
        let unmounted = false
        if (!unmounted) {
            for (var j = 0; j < DeviceDetails.length; j++) {
                loadData(DeviceDetails[j].deviceid)
            }
        }
        return () => { unmounted = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DeviceDetails])

    const loadData = (Device) => {
        axios.get(`https://janaaticsfunctionapp.azurewebsites.net/api/GetTimeSeriesData?code=5rUZrumKciSJ7bfhQjR38Qxkk7nUhTNR63phSsDHQOyRCisQ3CeuBA==&deviceid=${Device}&startTime=${START_TIME}&endTime=${END_TIME}`)
            .then(v => {
                if (v.data.length !== 0) {
                    setDevice(device => [...device, Device]);
                    setEnergy(energy => [...energy, JSON.parse(v.data.pop().data).Energy]);
                    setStatus(status => [...status, JSON.parse(v.data.pop().data).ALWAYSON]);
                }
                else {
                    setDevice(device => [...device, Device]);
                    setEnergy(energy => [...energy, 0.00]);
                    setStatus(status => [...status, 0.00]);
                }
            })
            .catch(err => console.log(`Invalid Device name -> ${err}`))
    }

    const render = () => {
        return (
            <>
                {DeviceDetails.length !== 0 && DeviceDetails.map((x, i) =>
                    <Grid item xs={12} sm={12} md={4} key={i}>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to={{ pathname: "/energy-meter-dashboard" }}>
                            <Card className={classes.firstcard} onClick={() => localStorage.setItem("Device", device[i])}>
                                {status[i] === 1 ?
                                    <div className={classes.beforedevicename}>
                                        <img src={on} className={classes.img} alt="on" />
                                        {device[i]}
                                    </div> :
                                    <div className={classes.beforedevicename}>
                                        <img src={off} className={classes.img} alt="off" />
                                        {device[i]}
                                    </div>
                                }
                                <Card className={classes.secondcard}>
                                    <div className={classes.opt}>
                                        <span>Power KWH Start</span>
                                        <span>{energy[i]} Unit</span>
                                    </div>
                                    <div className={classes.opt}>
                                        <span>Power KWH</span>
                                        <span>{energy[i]} Unit</span>
                                    </div>
                                    <div className={classes.opt}>
                                        <span>Total Energy Consumption</span>
                                        <span>{energy[i] && todayconsume.toFixed(2)} Unit</span>
                                    </div>
                                    <div className={classes.opt}>
                                        <span>Month Energy Consumption</span>
                                        <span>{energy[i] && month} Unit</span>
                                    </div>
                                </Card>
                            </Card>
                        </Link>
                    </Grid>
                )
                }
                <div>
                    <ToastContainer
                        position="top-right"
                        autoClose={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                    />
                </div>
            </>
        )
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
                {render()}
            </Grid>
        </>
    )
}

export default memo(MainDevice);