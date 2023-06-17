import { Provider } from 'react-redux';

import '@/styles/globals.sass';

import storeConfig from '@/store/storeConfig';

export default function App({ Component, pageProps }) {
    return (
        <Provider store={storeConfig}>
            <Component {...pageProps} />
        </Provider>
    );
}
