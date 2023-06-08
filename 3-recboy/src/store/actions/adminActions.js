import axios from 'axios';
import { ADMIN_SET_USERS } from '../types';

export const adminSetUsers = (users) => (dispatch) =>
    dispatch({ type: ADMIN_SET_USERS, payload: users });

export const adminGetDatas = () => (dispatch, getState) => {
    const state = getState();
    axios
        .get('/api/admin/getDatas', {
            headers: { authenticate: state.auth.userToken },
        })
        .then((res) => dispatch(adminSetUsers(res.data.users)))
        .catch((error) => console.log(error));
};
