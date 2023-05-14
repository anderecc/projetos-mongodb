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

export const authSetValues = (values) => (dispatch) => {
    dispatch({ type: AUTH_SET_VALUES, payload: values });
};

export const authSetErrors = (values) => (dispatch) => {
    dispatch({ type: AUTH_SET_ERRORS, payload: values });
};

export const authSetUser = (values) => (dispatch) => {
    dispatch({ type: AUTH_SET_USER, payload: values });
};

export const authSetUserToken = (token) => (dispatch) => {
    dispatch({ type: AUTH_SET_USER_TOKEN, payload: token });
};

export const authResetState = () => (dispatch) => {
    dispatch({ type: AUTH_RESET_STATE });
};

export const authLogin = (values, setCookie) => async (dispatch, getState) => {
    dispatch(contextSetLoading(true));
    axios
        .post('/api/auth/login', values)
        .then((res) => {
            const { token } = res.data;
            axios
                .post('/api/auth/validateToken', { token })
                .then(async (res) => {
                    const token = res.data.valid;
                    const { id, name, email } = res.data.decoded;
                    setCookie('user-token', token);

                    await dispatch(authSetUser({ id, name, email }));
                    await dispatch(authSetUserToken(token));

                    dispatch(contextSetLoading(false));
                    window.location.reload();
                })
                .catch((err) => {
                    const state = getState();
                    dispatch(contextSetLoading(false));
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
            dispatch(contextSetLoading(false));
            dispatch(
                authSetErrors({
                    ...state.auth.errors,
                    submitLogin: err.response.data.error,
                })
            );
        });
};

export const authRegister =
    (values, setCookie) => async (dispatch, getState) => {
        dispatch(contextSetLoading(true));
        axios
            .post('/api/auth/register', values)
            .then((res) => {
                const { token } = res.data;
                axios
                    .post('/api/auth/validateToken', { token })
                    .then(async (res) => {
                        const token = res.data.valid;
                        const { id, name, email } = res.data.decoded;
                        setCookie('user-token', token);

                        await dispatch(authSetUser({ id, name, email }));
                        await dispatch(authSetUserToken(token));

                        dispatch(contextSetLoading(false));
                        window.location.reload();
                    })
                    .catch((err) => {
                        const state = getState();
                        dispatch(contextSetLoading(false));
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
                dispatch(contextSetLoading(false));
                dispatch(
                    authSetErrors({
                        ...state.auth.errors,
                        submitRegister: err.response.data.error,
                    })
                );
            });
    };

export const authPersist = (token, setCookie) => async (dispatch, getState) => {
    if (token) {
        dispatch(contextSetLoading(true));
        axios
            .post('/api/auth/validateToken', { token })
            .then((res) => {
                const token = res.data.valid;
                const { id, name, email } = res.data.decoded;
                setCookie('user-token', token);
                dispatch(closingGetData(id, token));
                dispatch(authSetUser({ id, name, email }));
                dispatch(authSetUserToken(token));
                dispatch(contextSetLoading(false));
            })
            .catch((err) => {
                const state = getState();
                dispatch(contextSetLoading(false));
                dispatch(
                    authSetErrors({
                        ...state.auth.errors,
                        submitLogin: err.response.data.error,
                        submitRegister: err.response.data.error,
                    })
                );
            });
    }
};

export const authLogOut = () => async (dispatch) => {
    await dispatch(authResetState());
    await dispatch(contextResetState());
    await dispatch(closingResetState());

    window.location.reload();
};
