import Head from 'next/head';
import React, { useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { authPersist } from '@/store/actions/authActions';

const HeadApp = (props) => {
    const token = getCookie('user-token');
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(authPersist(token, setCookie));
        }
    }, [token]);

    return (
        <Head>
            <title>{props.title}</title>
            <meta
                name="description"
                content="Organize seus fechamentos de forma facilitada e intuitiva."
            />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default HeadApp;
