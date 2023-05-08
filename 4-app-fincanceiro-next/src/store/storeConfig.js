import { configureStore } from '@reduxjs/toolkit';

import dashboardReducer from './reducers/dashboardReducer';
import billingCyclesReducer from './reducers/billingCyclesReducer';
import formReducer from './reducers/formReducer';
import tabsReducer from './reducers/tabsReducer';
import authReducer from './reducers/authReducer';

let storeConfig = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        billingCycles: billingCyclesReducer,
        tabs: tabsReducer,
        form: formReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default storeConfig;
