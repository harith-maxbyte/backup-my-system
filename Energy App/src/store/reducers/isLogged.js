const defaultState = {
    btn: "",
    custombtn: [],

    device: [],
    energydaily: [],
    shiftdaily: [],

    energyweekly: [],
    shiftweekly: [],

    energymonthly: [],
    shiftmonthly: [],

    energyyearly: [],
    shiftyearly: [],

    energycustomly: [],
    shiftcustomly: [],
}

const loggedReducer = (state = defaultState, action) => {
    switch (action.type) {

        case 'SELECTED_BTN_':
            return { ...state, btn: action.data }
        case 'CUSTOM_BTN_':
            return { ...state, custombtn: action.data }

        case 'DEVICE_LIST_':
            return { ...state, device: action.data }
        case 'ENERGY_DAILY_':
            return { ...state, energydaily: action.data }
        case 'SHIFT_DAILY_':
            return { ...state, shiftdaily: action.data }
        case 'ENERGY_WEEKLY_':
            return { ...state, energyweekly: action.data }
        case 'SHIFT_WEEKLY_':
            return { ...state, shiftweekly: action.data }
        case 'ENERGY_MONTHLY_':
            return { ...state, energymonthly: action.data }
        case 'SHIFT_MONTHLY_':
            return { ...state, shiftmonthly: action.data }
        case 'ENERGY_YEAR_':
            return { ...state, energyyearly: action.data }
        case 'SHIFT_YEAR_':
            return { ...state, shiftyearly: action.data }

        case 'ENERGY_CUSTOM_':
            return { ...state, energycustomly: action.data }
        case 'SHIFT_CUSTOM_':
            return { ...state, shiftcustomly: action.data }
        default:
            return state;
    }
}

export default loggedReducer;