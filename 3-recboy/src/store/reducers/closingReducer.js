import {
    CLOSING_RESET_DAY_EDIT,
    CLOSING_SET_DATA,
    CLOSING_SET_DAY_EDIT,
} from '../types';

const initialState = {
    day: {},
    week: {
        values: [],
        total: 0,
    },
    aggregate: {
        values: [],
        total: 0,
    },
    dayToEdit: {
        index: null,
        date: '',
        values: [],
        total: 0,
    },
};

const closingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLOSING_SET_DATA:
            return { ...state, ...action.payload };
        case CLOSING_SET_DAY_EDIT:
            return {
                ...state,
                dayToEdit: { ...state.dayToEdit, ...action.payload },
            };
        case CLOSING_RESET_DAY_EDIT:
            return {
                ...state,
                dayToEdit: {
                    index: null,
                    date: '',
                    values: [],
                    total: 0,
                },
            };

        default:
            return { ...state };
    }
};

export default closingReducer;
