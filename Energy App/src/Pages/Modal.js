import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, DialogTitle } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useDispatch } from "react-redux";
import DatePicker from '@mui/lab/DatePicker';
import { AiFillCloseCircle } from "react-icons/ai";
import "./Modalstyles.css";
import { EnergyDaily, ShiftDaily, EnergyWeekly, ShiftWeekly, selectedBtn, CustomBtn, EnergyMonthly, ShiftMonthly, EnergyYear, ShiftYear, EnergyCustom, ShiftCustom } from '../store/actions/index';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <AiFillCloseCircle />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function Modal() {

    const toastId = React.useRef(null);
    const customId = "custom-id-yes";

    const dispatch = useDispatch();
    const textInput = useRef(null);
    const buttons = ["Day", "Week", "Month", "Year", "Custom"]
    const [side, setSide] = useState(false);

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    const [clickedId, setClickedId] = useState(-1);
    const [clickedbtn, setClickedbtn] = useState("Day");

    useEffect(() => {
        // textInput.current.focus();
        setClickedId(0);
        setSide(false);
        setClickedbtn("Day")
        dispatch(selectedBtn(clickedbtn))
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(selectedBtn(clickedbtn))
        if (clickedbtn === "Day") {
            dispatch(EnergyDaily())
            dispatch(ShiftDaily())
        }

        if (clickedbtn === "Week") {
            dispatch(EnergyWeekly())
            dispatch(ShiftWeekly())
        }

        if (clickedbtn === "Month") {
            dispatch(EnergyMonthly())
            dispatch(ShiftMonthly())
        }

        if (clickedbtn === "Year") {
            dispatch(EnergyYear())
            dispatch(ShiftYear())
        }

        setFrom(null)
        setTo(null)
        dispatch(CustomBtn(null))
    }, [clickedbtn])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(selectedBtn(clickedbtn))
        if (clickedbtn === "Custom") {
            if (moment(moment(from).year(), 'YYYY', true).isValid() && moment(moment(to).year(), 'YYYY', true).isValid()) {
                const is_before_date = (date1, date2) => date1 <= date2;
                var temp = is_before_date(new Date(from), new Date(to))
                //CORRECT DATE
                if (temp === true) {
                    if (!toast.isActive(toastId.current)) {
                        toast.dismiss()
                    }
                    var fr = moment.utc(from).format('MM/DD/YY')
                    var t = moment.utc(to).format('MM/DD/YY')
                    dispatch(CustomBtn([fr, t]))
                    dispatch(EnergyCustom(fr, t))
                    dispatch(ShiftCustom(fr, t))
                }
                //FALSE DATE
                else {
                     toast.error("Invalid Date!!", {
                        toastId: customId
                    });
                }
            }
        }
    }, [from, to])// eslint-disable-line react-hooks/exhaustive-deps

    const handleClick = (event, id) => {
        setClickedId(id);
        setSide(false);
        setClickedbtn(event.target.name)
    };

    const customHandleClick = (event, id) => {
        setClickedId(id);
        setSide(true);
        setClickedbtn(event.target.name)
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {buttons.map((buttonLabel, i) => {
                    if (buttonLabel === "Day") {
                        return (<button
                            ref={textInput}
                            key={buttonLabel}
                            name={buttonLabel}
                            onClick={(event) => handleClick(event, i)}
                            className={i === clickedId ? "customButton active" : "customButton"}
                            style={{ borderRadius: "30% 0% 0% 29% / 29% 0% 0% 28%" }}
                        >
                            {buttonLabel}
                        </button>)
                    }
                    else if (buttonLabel === "Custom") {
                        return (<button
                            key={buttonLabel}
                            name={buttonLabel}
                            onClick={(event) => customHandleClick(event, i)}
                            className={i === clickedId ? "customButton active" : "customButton"}
                            style={{ borderRadius: "0% 25% 23% 0% / 0% 27% 30% 28%" }}
                        >
                            {buttonLabel}
                        </button>)
                    }
                    else {
                        return (
                            <button
                                key={buttonLabel}
                                name={buttonLabel}
                                onClick={(event) => handleClick(event, i)}
                                className={i === clickedId ? "customButton active" : "customButton"}
                            >
                                {buttonLabel}
                            </button>)
                    }
                })}
            </div>
            {side &&

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 5 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "15px", color: "#fff"
                        }}>From</div>
                        <DatePicker
                            value={from}
                            onChange={(newValue) => {
                                setFrom(newValue);
                            }}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField {...params}
                                sx={{
                                    width: '30%',
                                    svg: { color: "#fff" },
                                    input: { color: "#fff", padding: 1 },
                                    label: { color: "#fff" }
                                }} />
                            }
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: 10,
                            fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "15px", color: "#fff"
                        }}>To</div>

                        <DatePicker
                            value={to}
                            onChange={(newValue) => {
                                setTo(newValue);
                            }}
                            inputFormat="dd/MM/yyyy"
                            renderInput={(params) => <TextField {...params} sx={{
                                width: '30%',
                                svg: { color: "#fff", margin: 0, padding: 0 },
                                input: { color: "#fff", padding: 1 },
                                label: { color: "#fff" }
                            }}
                            />}
                        />
                    </LocalizationProvider>
                </div>
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
    );
}

export default React.memo(Modal);