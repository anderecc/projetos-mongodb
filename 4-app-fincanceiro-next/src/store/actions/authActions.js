import axios from 'axios';
import {
    RESET_AUTH,
    RESET_AUTH_ERRORS,
    SET_AUTH_ERRORS,
    SET_USER_AUTH,
    SET_USER_TOKEN,
    SET_VALUES_AUTH,
} from '../types';
import { SET_MODE_AUTH } from '../types';

export let setModeAuth = (value) => {
    return (dispatch) => {
        dispatch({ type: SET_MODE_AUTH, payload: value });
    };
};

export let setValuesAuth = (values) => {
    return (dispatch) => {
        dispatch({ type: SET_VALUES_AUTH, payload: values });
    };
};

export let setUser = (values) => {
    return (dispatch) => {
        dispatch({ type: SET_USER_AUTH, payload: values });
    };
};

export let setUserToken = (token) => {
    return (dispatch) => {
        dispatch({ type: SET_USER_TOKEN, payload: token });
    };
};

export let setAuthErrors = (value) => {
    return (dispatch) => {
        dispatch({ type: SET_AUTH_ERRORS, payload: value });
    };
};

export let resetAuthErrors = () => {
    return (dispatch) => {
        dispatch({ type: RESET_AUTH_ERRORS });
    };
};

// CONTINUAR LOGADO

export let authPersist = (token) => {
    return async (dispatch, getState) => {
        axios
            .post('api/auth/validateToken', { token })
            .then(async (res) => {
                if (token === res.data.valid) {
                    const { id, name, email } = res.data.decoded;
                    await dispatch(resetAuthErrors());
                    await dispatch(setUserToken(res.data.valid));
                    await dispatch(
                        setUser({
                            id,
                            name,
                            email,
                        })
                    );
                }
            })
            .catch((error) => {
                const state = getState();
                dispatch(
                    setAuthErrors({
                        ...state.auth.errors,
                        token: error.response.data.msg,
                    })
                );
            });
    };
};

// FAZER LOGIN

export let authLogin = (values, push) => {
    return (dispatch, getState) => {
        axios
            .post('/api/auth/login', values)
            .then((res) => {
                const { token } = res.data;
                axios
                    .post('api/auth/validateToken', { token })
                    .then(async (res) => {
                        if (token === res.data.valid) {
                            const { id, name, email } = res.data.decoded;
                            document.cookie = `user-token=${res.data.valid}`;
                            await dispatch(resetAuthErrors());
                            await dispatch(setUserToken(res.data.valid));
                            await dispatch(
                                setUser({
                                    id,
                                    name,
                                    email,
                                })
                            );
                            push('/dashboard');
                        }
                    })
                    .catch((error) => {
                        const state = getState();

                        dispatch(
                            setAuthErrors({
                                ...state.auth.errors,
                                token: error.response.data.msg,
                            })
                        );
                    });
            })
            .catch((error) => {
                const state = getState();

                dispatch(
                    setAuthErrors({
                        ...state.auth.errors,
                        login: error.response.data.msg,
                    })
                );
            });
    };
};

//REGISTER USUÁRIO

export let authRegister = (values, push) => {
    return (dispatch, getState) => {
        axios
            .post('/api/auth/register', values)
            .then((res) => {
                const { token } = res.data;
                axios
                    .post('api/auth/validateToken', { token })
                    .then(async (res) => {
                        if (token === res.data.valid) {
                            const { id, name, email } = res.data.decoded;
                            document.cookie = `user-token=${res.data.valid}`;
                            await dispatch(resetAuthErrors());
                            await dispatch(setUserToken(res.data.valid));
                            await dispatch(
                                setUser({
                                    id,
                                    name,
                                    email,
                                })
                            );
                            push('/dashboard');
                        }
                    })
                    .catch((error) => {
                        const state = getState();

                        dispatch(
                            setAuthErrors({
                                ...state.auth.errors,
                                token: error.response.data.msg,
                            })
                        );
                    });
            })
            .catch((error) => {
                const state = getState();
                console.log(error.response.data.msg);
                dispatch(
                    setAuthErrors({
                        ...state.auth.errors,
                        register: error.response.data.msg,
                    })
                );
            });
    };
};

// SAIR DA APLICAÇÃO

export let authSignOut = (push) => {
    return async (dispatch) => {
        document.cookie = 'user-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        await dispatch({ type: RESET_AUTH });
        await push('/auth');
        window.location.reload(false);
    };
};
