import { SET_SHOW_TAB, SET_TABS_VISIBLE } from '../types';

export let showTab = (value) => {
    return (dispatch) => {
        dispatch({ type: SET_SHOW_TAB, payload: value });
    };
};

export let tabsVisible = (value) => {
    return (dispatch) => {
        dispatch({ type: SET_TABS_VISIBLE, payload: value });
    };
};
