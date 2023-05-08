import {
    RESET_AUTH,
    RESET_AUTH_ERRORS,
    SET_AUTH_ERRORS,
    SET_MODE_AUTH,
    SET_USER_AUTH,
    SET_USER_TOKEN,
    SET_VALUES_AUTH,
} from '../types';

let initialState = {
    mode: 'login',
    values: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    user: {},
    userToken: '',
    errors: {
        login: '',
        register: '',
        token: '',
    },
};

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODE_AUTH:
            return { ...state, mode: action.payload };

        case SET_VALUES_AUTH:
            return { ...state, values: { ...action.payload } };

        case SET_USER_AUTH:
            return { ...state, user: { ...action.payload } };

        case RESET_AUTH: {
            return {
                ...state,
                mode: 'login',
                values: {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                },
                user: {},
                userToken: '',
                errors: {
                    login: '',
                    register: '',
                    token: '',
                },
            };
        }

        case SET_USER_TOKEN:
            return { ...state, userToken: action.payload };

        case SET_AUTH_ERRORS:
            return {
                ...state,
                errors: { ...action.payload },
            };

        case RESET_AUTH_ERRORS:
            return {
                ...state,
                errors: {
                    login: '',
                    register: '',
                    token: '',
                },
            };

        default:
            return { ...state };
    }
};

export default authReducer;
