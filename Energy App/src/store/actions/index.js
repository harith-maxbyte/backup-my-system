import axios from "axios"
import { dayDate, weekDate, monthDate, yearDate,DEVICE_ENDPOINT } from "../../Helpers/Constatnt";

export const selectedBtn = (clickedbtn) => {
    return dispatch => {
        return dispatch({ type: "SELECTED_BTN_", data: clickedbtn });
    }
}

export const CustomBtn = (arr) => {
    return dispatch => {
        return dispatch({ type: "CUSTOM_BTN_", data: arr });
    }
}

export const EnergyDaily = () => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}EnergyDaily?devicename=EWON_FLEXY103&dt=${dayDate}&getType=Daily`)
            .then((response) => {
                dispatch({ type: "ENERGY_DAILY_", data: response.data });
            })
    }
}

export const ShiftDaily = () => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}ShiftEnergy?devicename=EWON_FLEXY103&dt=${dayDate}&getType=Daily`)
            .then((response) => {
                dispatch({ type: "SHIFT_DAILY_", data: response.data });
            })
    }
}

export const EnergyWeekly = () => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}EnergyDaily?devicename=EWON_FLEXY103&dt=${weekDate}&getType=Weekly`)
            .then((response) => {
                dispatch({ type: "ENERGY_WEEKLY_", data: response.data });
            })
    }
}

export const ShiftWeekly = () => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}ShiftEnergy?devicename=EWON_FLEXY103&dt=${weekDate}&getType=Weekly`)
            .then((response) => {
                dispatch({ type: "SHIFT_WEEKLY_", data: response.data });
            })
    }
}

export const EnergyMonthly = () => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}EnergyDaily?devicename=EWON_FLEXY103&dt=${monthDate}&getType=Monthly`)
            .then((response) => {
                dispatch({ type: "ENERGY_MONTHLY_", data: response.data });
            })
    }
}

export const ShiftMonthly = () => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}ShiftEnergy?devicename=EWON_FLEXY103&dt=${monthDate}&getType=Monthly`)
            .then((response) => {
                dispatch({ type: "SHIFT_MONTHLY_", data: response.data });
            })
    }
}

export const EnergyYear = () => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}EnergyDaily?devicename=EWON_FLEXY103&dt=${yearDate}&getType=Yearly`)
            .then((response) => {
                dispatch({ type: "ENERGY_YEAR_", data: response.data });
            })
    }
}

export const ShiftYear = () => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}ShiftEnergy?devicename=EWON_FLEXY103&dt=${yearDate}&getType=Yearly`)
            .then((response) => {
                dispatch({ type: "SHIFT_YEAR_", data: response.data });
            })
    }
}

export const EnergyCustom = (from, to) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}EnergyDaily/byDevice?devicename=EWON_FLEXY103&From=${from}&To=${to}&getType=Custom`)
            .then((response) => {
                dispatch({ type: "ENERGY_CUSTOM_", data: response.data });
            })
            .catch(err => { })
    }
}

export const ShiftCustom = (from, to) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}ShiftEnergy/byDevice?devicename=EWON_FLEXY103&From=${from}&To=${to}&getType=Custom`)
            .then((response) => {
                dispatch({ type: "SHIFT_CUSTOM_", data: response.data });
            })
            .catch(err => { })
    }
}






