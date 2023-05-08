import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.sass';
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap';
import { Provider } from 'react-redux';
import storeConfig from './store/storeConfig';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Dashboard from './pages/dashboard';
import BillingCycles from './pages/billingCycles';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={storeConfig}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                            path="/billingCycles"
                            element={<BillingCycles />}
                        />
                    </Route>
                    <Route path="*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
