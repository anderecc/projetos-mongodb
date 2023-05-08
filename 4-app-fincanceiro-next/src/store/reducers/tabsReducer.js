import { SET_SHOW_TAB, SET_TABS_VISIBLE } from '../types';

let initialState = {
    showTab: 'tabList',
    tabsVisible: ['tabList', 'tabAdd'],
};

let tabsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOW_TAB:
            return { ...state, showTab: action.payload };

        case SET_TABS_VISIBLE:
            return { ...state, tabsVisible: [...action.payload] };

        default:
            return { ...state };
    }
};

export default tabsReducer;
