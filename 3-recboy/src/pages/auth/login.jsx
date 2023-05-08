import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Container from '@/Components/Container';
import Head from '@/Components/Head';
import Form from '@/Components/auth/Form';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Loading from '@/Components/Loading';
import { useRouter } from 'next/router';

const Login = () => {
    const context = useSelector((state) => state.context);
    const auth = useSelector((state) => state.auth);
    const { push } = useRouter();

    useEffect(() => {
        if (auth.userToken) push('/dashboard');
    }, [auth.userToken]);

    return (
        <>
            <Head title="Login - recboy" />
            <Header />
            {context.loading ? (
                <Loading />
            ) : (
                <Container auth>
                    <Form change />
                </Container>
            )}
            <Footer loading={context.loading} />
        </>
    );
};

export default Login;
