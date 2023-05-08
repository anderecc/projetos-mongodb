import {
    ADD_CREDIT_VALUES,
    ADD_DEBIT_VALUES,
    RESET_VALUES_FORM,
    SET_NEW_CREDIT,
    SET_NEW_DEBIT,
    SET_VALUES_FORM,
} from '../types';

let initialState = {
    values: {
        name: '',
        year: '',
        month: '',
        credits: [],
        debits: [],
    },
    newCredit: { name: '', value: 0 },
    newDebit: { name: '', value: 0, status: 'PAGO' },
};

let formReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VALUES_FORM:
            return { ...state, values: { ...action.payload } };
        case RESET_VALUES_FORM:
            return {
                ...state,
                values: {
                    name: '',
                    year: '',
                    month: '',
                    credits: [],
                    debits: [],
                },
                newCredit: { name: '', value: 0 },
                newDebit: { name: '', value: 0, status: 'PAGO' },
            };
        case SET_NEW_CREDIT:
            return { ...state, newCredit: { ...action.payload } };
        case SET_NEW_DEBIT:
            return { ...state, newDebit: { ...action.payload } };

        case ADD_CREDIT_VALUES:
            return {
                ...state,
                values: {
                    ...state.values,
                    credits: [...state.values.credits, { ...state.newCredit }],
                },
            };

        case ADD_DEBIT_VALUES:
            return {
                ...state,
                values: {
                    ...state.values,
                    debits: [...state.values.debits, { ...state.newDebit }],
                },
            };

        default:
            return { ...state };
    }
};

export default formReducer;
