import {
    AUTH_RESET_STATE,
    AUTH_SET_ERRORS,
    AUTH_SET_USER,
    AUTH_SET_USER_TOKEN,
    AUTH_SET_VALUES,
} from '../types';

const initialState = {
    values: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    errors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        submitLogin: '',
        submitRegister: '',
    },
    user: {
        id: '',
        name: '',
        email: '',
    },
    userToken: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_VALUES:
            return { ...state, values: { ...action.payload } };

        case AUTH_SET_ERRORS:
            return { ...state, errors: { ...action.payload } };

        case AUTH_SET_USER:
            return { ...state, user: { ...action.payload } };

        case AUTH_SET_USER_TOKEN:
            return { ...state, userToken: action.payload };

        case AUTH_RESET_STATE:
            return {
                ...state,
                values: {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                },
                errors: {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    submitLogin: '',
                    submitRegister: '',
                },
                user: {
                    id: '',
                    name: '',
                    email: '',
                },
                userToken: '',
            };
        default:
            return { ...state };
    }
};

export default authReducer;
