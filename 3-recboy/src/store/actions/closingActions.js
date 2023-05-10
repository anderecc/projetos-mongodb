import axios from 'axios';
import {
    CLOSING_RESET_DAY_EDIT,
    CLOSING_RESET_STATE,
    CLOSING_SET_DATA,
    CLOSING_SET_DAY_EDIT,
} from '../types';
import { contextSetDate, contextSetLoading } from './contextActions';

export const closingSetData = (data) => (dispatch) => {
    let { closingDay, closingWeek, closingAggregate } = data;
    dispatch({
        type: CLOSING_SET_DATA,
        payload: {
            day: closingDay,
            week: closingWeek,
            aggregate: closingAggregate,
        },
    });
};

export const closingGetData = (id, token) => (dispatch) => {
    dispatch(contextSetLoading(true));
    axios
        .get(`/api/closing/getData/${id}`, {
            headers: { authenticate: token },
        })
        .then((res) => {
            let { date } = res.data.data.closingDay;
            date = date ? date.slice(1, 2) : '00';
            dispatch(contextSetDate(date));
            dispatch(closingSetData(res.data.data));
            dispatch(contextSetLoading(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(contextSetLoading(false));
        });
};

export const closingSetValueDay = (value, date) => (dispatch, getState) => {
    dispatch(contextSetLoading(true));
    const state = getState();
    const newValues = [...state.closing.day.values];
    if (newValues.length === 0) {
        newValues.push({ ...value });
    } else if (newValues.some((item) => item.name === value.name)) {
        newValues.forEach((item, index) => {
            if (item.name === value.name) {
                const newItem = {
                    name: item.name,
                    value: +item.value + +value.value,
                };
                newValues[index] = newItem;
            }
            return newValues;
        });
    } else {
        newValues.push(value);
    }
    const total = newValues.reduce((acc, crr) => acc + +crr.value, 0);
    axios
        .put(
            `/api/closing/updateDay/${state.auth.user.id}`,
            {
                date,
                values: newValues,
                total,
            },
            {
                headers: {
                    authenticate: state.auth.userToken,
                },
            }
        )
        .then((res) => {
            dispatch(closingSetData(res.data.data));
            dispatch(contextSetLoading(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(contextSetLoading(false));
        });
};

export const closingUpdateValueDay = (value, index) => (dispatch, getState) => {
    const state = getState();
    const newValues = [...state.closing.day.values];
    newValues[index] = value;
    const total = newValues.reduce((acc, crr) => acc + crr.value, 0);

    axios
        .put(
            `/api/closing/updateDay/${state.auth.user.id}`,
            {
                values: newValues,
                total,
            },
            {
                headers: {
                    authenticate: state.auth.userToken,
                },
            }
        )
        .then((res) => {
            dispatch(closingSetData(res.data.data));
        })
        .catch((err) => {
            console.log(err);
            dispatch(contextSetLoading(false));
        });
};

export const closingDeleteValueDay = (index) => (dispatch, getState) => {
    dispatch(contextSetLoading(true));
    const state = getState();
    const newValues = [...state.closing.day.values];
    newValues.splice(index, 1);
    const total = newValues.reduce((acc, crr) => acc + crr.value, 0);

    axios
        .put(
            `/api/closing/updateDay/${state.auth.user.id}`,
            {
                values: newValues,
                total,
            },
            {
                headers: {
                    authenticate: state.auth.userToken,
                },
            }
        )
        .then((res) => {
            dispatch(closingSetData(res.data.data));
            dispatch(contextSetLoading(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(contextSetLoading(false));
        });
};

export const closingDay = (push) => (dispatch, getState) => {
    dispatch(contextSetLoading(true));
    const state = getState();

    if (state.closing.day.values.length !== 0) {
        const newValues = [...state.closing.week.values];
        newValues.push(state.closing.day);
        const total = newValues.reduce((acc, crr) => acc + crr.total, 0);

        axios
            .put(
                `/api/closing/updateWeek/${state.auth.user.id}`,
                {
                    values: newValues,
                    total,
                },
                {
                    headers: {
                        authenticate: state.auth.userToken,
                    },
                }
            )
            .then(() => {
                axios
                    .post(
                        '/api/closing/updateDay/reset',
                        {
                            id: state.auth.user.id,
                        },
                        {
                            headers: {
                                authenticate: state.auth.userToken,
                            },
                        }
                    )
                    .then(async (res) => {
                        await dispatch(closingSetData(res.data.data));
                        await dispatch(contextSetDate('00'));
                        dispatch(contextSetLoading(false));
                        push('/dashboard');
                    })
                    .catch((err) => {
                        console.log(err);
                        dispatch(contextSetLoading(false));
                    });
            })
            .catch((err) => {
                console.log(err);
                dispatch(contextSetLoading(false));
            });
    }
};

export const closingWeek = () => (dispatch, getState) => {
    dispatch(contextSetLoading(true));
    const state = getState();

    const newValues = [...state.closing.aggregate.values];
    newValues.unshift(state.closing.week);
    const total = newValues.reduce((acc, crr) => acc + crr.total, 0);

    axios
        .put(
            `/api/closing/updateAggregate/${state.auth.user.id}`,
            {
                values: newValues,
                total,
            },
            {
                headers: {
                    authenticate: state.auth.userToken,
                },
            }
        )
        .then(() => {
            axios
                .post(
                    '/api/closing/updateWeek/reset',
                    {
                        id: state.auth.user.id,
                    },
                    {
                        headers: {
                            authenticate: state.auth.userToken,
                        },
                    }
                )
                .then((res) => {
                    dispatch(closingSetData(res.data.data));
                    dispatch(contextSetLoading(false));
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(contextSetLoading(false));
                });
        })
        .catch((err) => {
            console.log(err);
            dispatch(contextSetLoading(false));
        });
};

export const closingDeleteWeek = (index) => (dispatch, getState) => {
    dispatch(contextSetLoading(true));
    const state = getState();
    const newValues = [...state.closing.week.values];
    newValues.splice(index, 1);

    const total = newValues.reduce((acc, crr) => acc + crr.total, 0);
    axios
        .put(
            `/api/closing/updateWeek/${state.auth.user.id}`,
            {
                values: newValues,
                total,
            },
            {
                headers: {
                    authenticate: state.auth.userToken,
                },
            }
        )
        .then((res) => {
            dispatch(closingSetData(res.data.data));
            dispatch(contextSetLoading(false));
        })
        .catch((err) => {
            console.log(err);
            dispatch(contextSetLoading(false));
        });
};

export const closingWeekSetDayUpdate = (index) => (dispatch, getState) => {
    const state = getState();

    const newValues = [...state.closing.week.values];
    const { date, values, total } = newValues[index];
    dispatch({
        type: CLOSING_SET_DAY_EDIT,
        payload: { index, date, values, total },
    });
};

export const closingWeekDeleteValueDay = (index) => (dispatch, getState) => {
    const state = getState();
    const newValues = [...state.closing.dayToEdit.values];
    newValues.splice(index, 1);

    const total = newValues.reduce((acc, crr) => acc + crr.value, 0);

    dispatch({
        type: CLOSING_SET_DAY_EDIT,
        payload: { values: newValues, total },
    });
};

export const closingWeekChangeValueDay =
    (value, index) => (dispatch, getState) => {
        const state = getState();
        const newValues = [...state.closing.dayToEdit.values];
        newValues[index] = value;
        const total = newValues.reduce((acc, crr) => acc + crr.value, 0);
        dispatch({
            type: CLOSING_SET_DAY_EDIT,
            payload: { values: newValues, total },
        });
    };

export const closingUpdateDayInWeek = (push) => (dispatch, getState) => {
    dispatch(contextSetLoading(true));

    const state = getState();
    const newValues = [...state.closing.week.values];
    const { index, date, values, total } = state.closing.dayToEdit;

    newValues[index] = { date, values, total };

    const newTotal = newValues.reduce((acc, crr) => acc + crr.total, 0);

    axios
        .put(
            `/api/closing/updateWeek/${state.auth.user.id}`,
            { values: newValues, total: newTotal },
            {
                headers: {
                    authenticate: state.auth.userToken,
                },
            }
        )
        .then(async (res) => {
            await dispatch(closingSetData(res.data.data));
            await dispatch({ type: CLOSING_RESET_DAY_EDIT });
            dispatch(contextSetLoading(false));
            push('/dashboard');
        })
        .catch((err) => {
            console.log(err);
            dispatch(contextSetLoading(false));
        });
};

export const closingCancelEditDay = () => (dispatch) => {
    dispatch({ type: CLOSING_RESET_DAY_EDIT });
};

export const closingAddValueInDayToEdit = (value) => (dispatch, getState) => {
    const state = getState();
    const newValues = [...state.closing.dayToEdit.values];
    if (newValues.length === 0) {
        newValues.push({ ...value });
    } else if (newValues.some((item) => item.name === value.name)) {
        newValues.forEach((item, index) => {
            if (item.name === value.name) {
                const newItem = {
                    name: item.name,
                    value: +item.value + +value.value,
                };
                newValues[index] = newItem;
            }
            return newValues;
        });
    } else {
        newValues.push(value);
    }
    const total = newValues.reduce((acc, crr) => acc + +crr.value, 0);
    dispatch({
        type: CLOSING_SET_DAY_EDIT,
        payload: { values: newValues, total },
    });
};

export const closingResetState = () => (dispatch) => {
    dispatch({ type: CLOSING_RESET_STATE });
};
