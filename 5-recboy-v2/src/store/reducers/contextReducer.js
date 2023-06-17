import {
    CONTEXT_CHANGE_PERCENT,
    CONTEXT_CHANGE_VALUE,
    CONTEXT_RESET_STATE,
    CONTEXT_SET_DATE,
    CONTEXT_SET_LOADING,
    CONTEXT_SET_MESSAGE,
    CONTEXT_WEEK_TO_PDF,
} from '../types';

const initialState = {
    loading: false,
    date: '00',
    weekDate: '',
    month: '',
    value: 0,
    percent: 0,
    weekToPdf: { values: [], total: 0 },
    message: { text: '', type: '', visible: false },
};

const contextReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTEXT_SET_LOADING:
            return { ...state, loading: action.payload };

        case CONTEXT_SET_DATE:
            return { ...state, date: action.payload };

        case CONTEXT_CHANGE_VALUE:
            return { ...state, value: action.payload };

        case CONTEXT_CHANGE_PERCENT:
            return { ...state, percent: action.payload };

        case CONTEXT_WEEK_TO_PDF:
            return { ...state, weekToPdf: { ...action.payload } };

        case CONTEXT_RESET_STATE:
            return {
                loading: false,
                date: '00',
                weekDate: '',
                month: '',
                value: 0,
                percent: 0,
                weekToPdf: { values: [], total: 0 },
                message: { text: '', type: '', visible: false },
            };
        case CONTEXT_SET_MESSAGE:
            return { ...state, message: { ...action.payload } };

        default:
            return { ...state };
    }
};

export default contextReducer;
