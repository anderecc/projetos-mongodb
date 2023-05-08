import {
    ADD_CREDIT_VALUES,
    ADD_DEBIT_VALUES,
    RESET_VALUES_FORM,
    SET_NEW_CREDIT,
    SET_NEW_DEBIT,
    SET_VALUES_FORM,
} from '../types';

export let setValues = (values) => {
    return (dispatch) => {
        dispatch({ type: SET_VALUES_FORM, payload: values });
    };
};

export let resetValues = () => {
    return (dispatch) => {
        dispatch({ type: RESET_VALUES_FORM });
    };
};

export let setNewCredit = (values) => {
    return (dispatch) => {
        dispatch({ type: SET_NEW_CREDIT, payload: values });
    };
};
export let setNewDebit = (values) => {
    return (dispatch) => {
        dispatch({ type: SET_NEW_DEBIT, payload: values });
    };
};

export let addNewCredit = () => {
    return (dispatch) => {
        dispatch({ type: ADD_CREDIT_VALUES });
    };
};

export let addNewDebit = () => {
    return (dispatch) => {
        dispatch({ type: ADD_DEBIT_VALUES });
    };
};
