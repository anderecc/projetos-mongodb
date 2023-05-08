import React from 'react';
import { useSelector } from 'react-redux';

import Container from '@/Components/Container';
import Head from '@/Components/Head';
import Form from '@/Components/auth/Form';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import Loading from '@/Components/Loading';

const Login = () => {
    const context = useSelector((state) => state.context);

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
