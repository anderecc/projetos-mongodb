import { authPersist } from '@/store/actions/authActions';
import { RESET_AUTH } from '@/store/types';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const HeadPage = (props) => {
    const dispatch = useDispatch();
    const token = getCookie('user-token');

    useEffect(() => {
        if (token) dispatch(authPersist(token));
        if (!token) dispatch({ type: RESET_AUTH });
    }, [token]);

    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content="Generated by create next app" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
        </Head>
    );
};

export default HeadPage;
