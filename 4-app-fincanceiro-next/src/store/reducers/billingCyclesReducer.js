import {
    RESET_ITEM_TO_EDIT,
    SET_BILLINGCYCLE,
    SET_ITEM_TO_EDIT,
    SET_MESSAGE_ERROR,
    SET_MESSAGE_SUCCESS,
} from '../types';

let initialState = {
    billingCycles: [],
    messages: {
        success: '',
        error: [],
    },
    itemToEdit: {},
};

let billingCyclesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BILLINGCYCLE:
            return { ...state, billingCycles: action.payload };

        case SET_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: { ...state.messages, success: action.payload },
            };
        case SET_MESSAGE_ERROR:
            return {
                ...state,
                messages: { ...state.messages, error: action.payload },
            };
        case SET_ITEM_TO_EDIT:
            return { ...state, itemToEdit: { ...action.payload } };

        case RESET_ITEM_TO_EDIT:
            return { ...state, itemToEdit: {} };
        default:
            return { ...state };
    }
};

export default billingCyclesReducer;
