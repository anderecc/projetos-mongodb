import axios from 'axios';
import {
    AUTH_RESET_STATE,
    AUTH_SET_ERRORS,
    AUTH_SET_USER,
    AUTH_SET_USER_TOKEN,
    AUTH_SET_VALUES,
} from '../types';
import { contextResetState, contextSetLoading } from './contextActions';
import { closingGetData, closingResetState } from './closingActions';

export const authSetValues = (values) => {
    return (dispatch) => {
        dispatch({ type: AUTH_SET_VALUES, payload: values });
    };
};

export const authSetErrors = (values) => {
    return (dispatch) => {
        dispatch({ type: AUTH_SET_ERRORS, payload: values });
    };
};

export const authSetUser = (values) => {
    return (dispatch) => {
        dispatch({ type: AUTH_SET_USER, payload: values });
    };
};

export const authSetUserToken = (token) => {
    return (dispatch) => {
        dispatch({ type: AUTH_SET_USER_TOKEN, payload: token });
    };
};

export const authResetState = () => {
    return (dispatch) => {
        dispatch({ type: AUTH_RESET_STATE });
    };
};

export const authLogin = (values) => {
    return async (dispatch, getState) => {
        dispatch(contextSetLoading(true));
        await axios
            .post('/api/auth/login', values)
            .then((res) => {
                const { token } = res.data;
                axios
                    .post('/api/auth/validateToken', { token })
                    .then(async (res) => {
                        const token = res.data.valid;
                        const { id, name, email } = res.data.decoded;
                        document.cookie = `user-token=${token}`;

                        await dispatch(authSetUser({ id, name, email }));
                        await dispatch(authSetUserToken(token));
                    })
                    .catch((err) => {
                        const state = getState();
                        dispatch(
                            authSetErrors({
                                ...state.auth.errors,
                                submitLogin: err.response.data.error,
                            })
                        );
                    });
            })
            .catch((err) => {
                const state = getState();
                dispatch(
                    authSetErrors({
                        ...state.auth.errors,
                        submitLogin: err.response.data.error,
                    })
                );
            });
        dispatch(contextSetLoading(false));
    };
};

export const authRegister = (values) => {
    return async (dispatch, getState) => {
        dispatch(contextSetLoading(true));
        await axios
            .post('/api/auth/register', values)
            .then((res) => {
                const { token } = res.data;
                axios
                    .post('/api/auth/validateToken', { token })
                    .then(async (res) => {
                        const token = res.data.valid;
                        const { id, name, email } = res.data.decoded;
                        document.cookie = `user-token=${token}`;

                        await dispatch(authSetUser({ id, name, email }));
                        await dispatch(authSetUserToken(token));
                    })
                    .catch((err) => {
                        const state = getState();
                        dispatch(
                            authSetErrors({
                                ...state.auth.errors,
                                submitRegister: err.response.data.error,
                            })
                        );
                    });
            })
            .catch((err) => {
                const state = getState();
                dispatch(
                    authSetErrors({
                        ...state.auth.errors,
                        submitRegister: err.response.data.error,
                    })
                );
            });
        dispatch(contextSetLoading(false));
    };
};

export const authPersist = (token) => {
    return async (dispatch, getState) => {
        if (token) {
            dispatch(contextSetLoading(true));
            await axios
                .post('/api/auth/validateToken', { token })
                .then((res) => {
                    const token = res.data.valid;
                    const { id, name, email } = res.data.decoded;
                    document.cookie = `user-token=${token}`;
                    dispatch(closingGetData(id, token));
                    dispatch(authSetUser({ id, name, email }));
                    dispatch(authSetUserToken(token));
                })
                .catch((err) => {
                    const state = getState();
                    dispatch(
                        authSetErrors({
                            ...state.auth.errors,
                            submitLogin: err.response.data.error,
                            submitRegister: err.response.data.error,
                        })
                    );
                });
            dispatch(contextSetLoading(false));
        }
    };
};

export const authLogOut = (push) => {
    return async (dispatch) => {
        await dispatch(authResetState());
        await dispatch(contextResetState());
        await dispatch(closingResetState());
        document.cookie =
            await 'user-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        await push('/auth/login');
    };
};
