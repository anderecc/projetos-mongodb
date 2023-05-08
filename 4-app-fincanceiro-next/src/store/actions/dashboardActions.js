import axios from 'axios';
import { SET_SUMMARY } from '../types';

export let getSummary = (token) => {
    return async (dispatch) => {
        token
            ? axios
                  .get(`api/billingCycles/summary`, {
                      headers: {
                          authenticate: token,
                      },
                  })
                  .then((res) => {
                      const data = res.data.length
                          ? res.data
                          : [{ credit: 0, debit: 0 }];
                      dispatch({ type: SET_SUMMARY, payload: data });
                  })
                  .catch(() => {
                      dispatch({
                          type: SET_SUMMARY,
                          payload: { credit: 0, debit: 0 },
                      });
                  })
            : false;
    };
};
