import { Provider } from 'react-redux';
import storeConfig from '@/store/storeConfig';
import '../styles/index.sass';

export default function App({ Component, pageProps }) {
    return (
        <Provider store={storeConfig}>
            <Component {...pageProps} />
        </Provider>
    );
}
