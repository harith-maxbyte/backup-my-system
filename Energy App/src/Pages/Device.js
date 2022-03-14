import { MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeviceList, EnergyDaily, EnergyWeekly, EnergyYear, EnergyCustom, ShiftCustom, EnergyMonthly, ShiftDaily, ShiftWeekly, ShiftMonthly, ShiftYear } from '../store/actions/index'

const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            // position:"fixed",
            // overflow: "visible !important",
            // width: "calc(100vw - 1px)",
            // width:"100vw"
        },
    },

    quantityRoot: {
        opacity: 0.9,
        borderRadius: "5px",
        paddingLeft: '.5rem',
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: "15px",
        color: "#fff",

        "&:hover": {
            opacity: 1,
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none !important", outline: "none !important",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none !important", outline: "none !important",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {

            borderRadius: "5px 5px 0 0", border: "none !important", outline: "none !important",
        },
        "& .Mui-disabled": {
            color: "#FFFFFF",
            opacity: 0.6, border: "none !important", outline: "none !important",
        },
        "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
            border: "none !important", outline: "none !important",
        }
    },
    selectRoot: {
        color: "#FFFFFF"
    },
    icon: {
        color: "#FFFFFF"
    },
    selectPaper: {
        width: "100vw",
        backgroundColor: "#1E1E24",
        border: "1px solid #484850",
        borderRadius: "5px",
        color: "#FFFFFF",
        "& li:hover": {
            backgroundColor: "#303039"
        }
    }
}));

// const useStyles = makeStyles({
//     // "@global": {
//     //     body: {
//     //         overflow: "visible !important",
//     //         // width: "calc(100vw - 1px)",
//     //         // width:"100vw"
//     //         // padding: 0
//     //     },
//     // },
//     select: {
//         "&:before": {
//             // normal
//             borderBottom: "1px solid orange"
//         },
//         "&:after": {
//             // focused
//             borderBottom: `3px solid green`
//         },
//         "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
//             // hover
//             borderBottom: `2px solid purple`
//         }
//     }
// });

function App(props) {

    const classes = useStyles();
    const dispatch = useDispatch()

    const [dev, setDev] = React.useState(localStorage.getItem("Device"));

    useEffect(() => {
        let unmounted = false
        if (!unmounted) {
            dispatch(DeviceList())
            setDev(localStorage.getItem("Device"))
        }
        return () => { unmounted = true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let Device = useSelector(state => { return state.loggedReducer.device });
    let button = useSelector(state => { return state.loggedReducer.btn });
    let fromto = useSelector(state => { return state.loggedReducer.custombtn });

    const handleChange = (event) => {
        setDev(event.target.value);
        localStorage.setItem("Device", event.target.value);

        if (props.state === "dashboard1") {
            dispatch(EnergyDaily(event.target.value))
            dispatch(ShiftDaily(event.target.value))
            dispatch(EnergyMonthly(event.target.value))

            if (button === "Week") {
                dispatch(EnergyWeekly(event.target.value))
                dispatch(ShiftWeekly(event.target.value))
            }
            if (button === "Month") {
                dispatch(ShiftMonthly(event.target.value))
            }
            if (button === "Year") {
                dispatch(EnergyYear(event.target.value))
                dispatch(ShiftYear(event.target.value))
            }
            if (button === "Custom") {
                dispatch(EnergyCustom(fromto[0], fromto[1], event.target.value))
                dispatch(ShiftCustom(fromto[0], fromto[1], event.target.value))
            }
        }
        else {
            props.func(event.target.value)
        }
    };
    return (
        <React.Fragment>
            <Select
                value={dev}
                onChange={(e) => handleChange(e)}
                defaultValue={localStorage.getItem("Device")}
                // defaultValue=""
                className={classes.quantityRoot}
                inputProps={{
                    classes: {
                        icon: classes.icon,
                        root: classes.quantityRoot,
                    },
                }}
            >
                {Device.length !== 0 && Device.map(v => {
                    return (
                        <MenuItem key={v.deviceid} value={v.deviceid}>
                            {v.deviceid}
                        </MenuItem>
                    )
                })
                }
            </Select>
        </React.Fragment>
    );
}

export default React.memo(App);