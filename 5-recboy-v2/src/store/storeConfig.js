import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import contextReducer from './reducers/contextReducer';
import closingReducer from './reducers/closingReducer';
import adminReducer from './reducers/adminReducer';

const storeConfig = configureStore({
    reducer: {
        auth: authReducer,
        context: contextReducer,
        closing: closingReducer,
        admin: adminReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default storeConfig;
