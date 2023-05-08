import { SET_SUMMARY } from '../types';

let initialState = {
    summary: [{ credit: 0, debit: 0 }],
};

let dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUMMARY:
            return { ...state, summary: [...action.payload] };

        default:
            return { ...state };
    }
};

export default dashboardReducer;
