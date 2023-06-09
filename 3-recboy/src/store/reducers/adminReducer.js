import { ADMIN_SET_USERS } from '../types';

const initialState = {
    users: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_SET_USERS:
            return { ...state, users: [...action.payload] };

        default:
            return { ...state };
    }
};

export default adminReducer;
