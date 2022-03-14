import axios from "axios"
import { dayDate, weekDate, monthDate, yearDate, DEVICE_ENDPOINT } from "../../Helpers/Constatnt";

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

export const DeviceList = () => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}ShiftEnergy/List`)
            .then((response) => {
                dispatch({ type: "DEVICE_LIST_", data: response.data });
            })
    }
}

export const EnergyDaily = (device) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}EnergyDaily?devicename=${device}&dt=${dayDate}&getType=Daily`)
            .then((response) => {
                dispatch({ type: "ENERGY_DAILY_", data: response.data });
            })
    }
}

export const ShiftDaily = (device) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}ShiftEnergy?devicename=${device}&dt=${dayDate}&getType=Daily`)
            .then((response) => {
                dispatch({ type: "SHIFT_DAILY_", data: response.data });
            })
    }
}

export const EnergyWeekly = (device) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}EnergyDaily?devicename=${device}&dt=${weekDate}&getType=Weekly`)
            .then((response) => {
                dispatch({ type: "ENERGY_WEEKLY_", data: response.data });
            })
    }
}

export const ShiftWeekly = (device) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}ShiftEnergy?devicename=${device}&dt=${weekDate}&getType=Weekly`)
            .then((response) => {
                dispatch({ type: "SHIFT_WEEKLY_", data: response.data });
            })
    }
}

export const EnergyMonthly = (device) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}EnergyDaily?devicename=${device}&dt=${monthDate}&getType=Monthly`)
            .then((response) => {
                dispatch({ type: "ENERGY_MONTHLY_", data: response.data });
            })
    }
}

export const ShiftMonthly = (device) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}ShiftEnergy?devicename=${device}&dt=${monthDate}&getType=Monthly`)
            .then((response) => {
                dispatch({ type: "SHIFT_MONTHLY_", data: response.data });
            })
    }
}

export const EnergyYear = (device) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}EnergyDaily?devicename=${device}&dt=${yearDate}&getType=Yearly`)
            .then((response) => {
                dispatch({ type: "ENERGY_YEAR_", data: response.data });
            })
    }
}

export const ShiftYear = (device) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}ShiftEnergy?devicename=${device}&dt=${yearDate}&getType=Yearly`)
            .then((response) => {
                dispatch({ type: "SHIFT_YEAR_", data: response.data });
            })
    }
}

export const EnergyCustom = (from, to, device) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}EnergyDaily/byDevice?devicename=${device}&From=${from}&To=${to}&getType=Custom`)
            .then((response) => {
                dispatch({ type: "ENERGY_CUSTOM_", data: response.data });
            })
            .catch(err => { })
    }
}

export const ShiftCustom = (from, to, device) => {
    return dispatch => {
        return axios.get(`${DEVICE_ENDPOINT}ShiftEnergy/byDevice?devicename=${device}&From=${from}&To=${to}&getType=Custom`)
            .then((response) => {
                dispatch({ type: "SHIFT_CUSTOM_", data: response.data });
            })
            .catch(err => { })
    }
}






