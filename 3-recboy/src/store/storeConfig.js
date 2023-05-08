import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import contextReducer from './reducers/contextReducer';
import closingReducer from './reducers/closingReducer';

const storeConfig = configureStore({
    reducer: {
        auth: authReducer,
        context: contextReducer,
        closing: closingReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default storeConfig;
