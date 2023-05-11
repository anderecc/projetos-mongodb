import {
    CONTEXT_CHANGE_PERCENT,
    CONTEXT_CHANGE_VALUE,
    CONTEXT_RESET_STATE,
    CONTEXT_SET_DATE,
    CONTEXT_SET_LOADING,
    CONTEXT_WEEK_TO_PDF,
} from '../types';

export const contextSetLoading = (value) => (dispatch) => {
    dispatch({ type: CONTEXT_SET_LOADING, payload: value });
};

export const contextSetDate = (value) => async (dispatch) => {
    let date = value;
    if (date <= 9) date = `0${date}`;
    else date = value;

    dispatch({ type: CONTEXT_SET_DATE, payload: date });
};

export const contextChangeValue = (value) => (dispatch) =>
    dispatch({ type: CONTEXT_CHANGE_VALUE, payload: +value });

export const contextChangePercent = (value) => (dispatch) =>
    dispatch({ type: CONTEXT_CHANGE_PERCENT, payload: +value });

export const contextSetWeekToPdf = (week) => (dispatch) => {
    dispatch({ type: CONTEXT_WEEK_TO_PDF, payload: week });
};

export const contextResetState = () => (dispatch) => {
    dispatch({ type: CONTEXT_RESET_STATE });
};
