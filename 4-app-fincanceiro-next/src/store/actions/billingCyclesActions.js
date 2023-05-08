import axios from 'axios';
import {
    RESET_ITEM_TO_EDIT,
    SET_BILLINGCYCLE,
    SET_ITEM_TO_EDIT,
    SET_MESSAGE_ERROR,
    SET_MESSAGE_SUCCESS,
} from '../types';

import { showTab, tabsVisible } from './tabsActions';
import { resetValues, setValues } from './formActions';

export let getList = (token) => {
    return (dispatch) => {
        token
            ? axios
                  .get(`api/billingCycles`, {
                      headers: {
                          authenticate: token,
                      },
                  })
                  .then((res) =>
                      dispatch({ type: SET_BILLINGCYCLE, payload: res.data })
                  )
            : false;
    };
};

export let createItem = (value) => {
    return (dispatch, getState) => {
        const state = getState();
        axios
            .post(`api/billingCycles`, value, {
                headers: {
                    authenticate: state.auth.userToken,
                },
            })
            .then(() => {
                dispatch({
                    type: SET_MESSAGE_SUCCESS,
                    payload: 'Dados cadastrados com sucesso.',
                });

                // limpando formulário
                dispatch(resetValues());

                //pegando lista atualizada
                dispatch(getList(state.auth.userToken));

                setTimeout(() => {
                    dispatch({
                        type: SET_MESSAGE_SUCCESS,
                        payload: '',
                    });

                    // direcionando para a lista de documentos
                    dispatch(showTab('tabList'));
                    dispatch(tabsVisible(['tabList', 'tabAdd']));
                }, 1500);
            })
            .catch((error) => {
                dispatch({
                    type: SET_MESSAGE_ERROR,
                    payload: error.response.data.errors,
                });
                setTimeout(() => {
                    dispatch({
                        type: SET_MESSAGE_ERROR,
                        payload: [],
                    });
                }, 3000);
            });
    };
};

export let updateItem = (values) => {
    return (dispatch, getState) => {
        let state = getState();
        axios
            .put(
                `api/billingCycles/${state.billingCycles.itemToEdit._id}`,
                values,
                {
                    headers: {
                        authenticate: state.auth.userToken,
                    },
                }
            )
            .then(() => {
                dispatch(getList(state.auth.userToken));
                dispatch({
                    type: SET_MESSAGE_SUCCESS,
                    payload: 'Registro alterado com sucesso.',
                });
                setTimeout(() => {
                    dispatch({
                        type: SET_MESSAGE_SUCCESS,
                        payload: '',
                    });

                    // direcionando para a lista de documentos
                    dispatch(resetItemToEdit());
                    dispatch(showTab('tabList'));
                    dispatch(tabsVisible(['tabList', 'tabAdd']));
                }, 1500);
            })
            .catch((error) => {
                dispatch({
                    type: SET_MESSAGE_ERROR,
                    payload: error.response.data.errors,
                });
                setTimeout(() => {
                    dispatch({
                        type: SET_MESSAGE_ERROR,
                        payload: [],
                    });
                }, 1500);
            });
    };
};

export let deleteItem = () => {
    return (dispatch, getState) => {
        let state = getState();
        axios
            .delete(`api/billingCycles/${state.billingCycles.itemToEdit._id}`, {
                headers: {
                    authenticate: state.auth.userToken,
                },
            })
            .then(() => {
                dispatch({
                    type: SET_MESSAGE_SUCCESS,
                    payload: 'Registro foi excluído com sucesso.',
                });
                dispatch(getList(state.auth.userToken));

                setTimeout(() => {
                    dispatch({ type: SET_MESSAGE_SUCCESS, payload: '' });
                    dispatch(resetItemToEdit());
                    dispatch(showTab('tabList'));
                    dispatch(tabsVisible(['tabList', 'tabAdd']));
                }, 1500);
            })
            .catch((error) => {
                dispatch({
                    type: SET_MESSAGE_ERROR,
                    payload: error.response.data.errors,
                });
                setTimeout(() => {
                    dispatch({
                        type: SET_MESSAGE_ERROR,
                        payload: [],
                    });
                }, 1500);
            });
    };
};

export let resetItemToEdit = () => {
    return (dispatch) => {
        dispatch({ type: RESET_ITEM_TO_EDIT });
        dispatch(resetValues());
    };
};

export let itemToEdit = (item) => {
    return (dispatch) => {
        dispatch({ type: SET_ITEM_TO_EDIT, payload: item });
        dispatch(
            setValues({
                name: item.name,
                month: item.month,
                year: item.year,
                credits: item.credits,
                debits: item.debits,
            })
        );
    };
};

export let cancel = () => {
    return (dispatch) => {
        dispatch(resetItemToEdit());
        dispatch(showTab('tabList'));
        dispatch(tabsVisible(['tabList', 'tabAdd']));
    };
};
