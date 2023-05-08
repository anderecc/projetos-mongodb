import React from 'react';
import { useSelector } from 'react-redux';

import Container from '@/Components/Container';
import Footer from '@/Components/Footer';
import Head from '@/Components/Head';
import Header from '@/Components/Header';
import Loading from '@/Components/Loading';
import Form from '@/Components/auth/Form';

const Register = () => {
    const context = useSelector((state) => state.context);

    return (
        <>
            <Head title="Register - recboy" />
            <Header />
            {context.loading ? (
                <Loading />
            ) : (
                <Container auth>
                    <Form register />
                </Container>
            )}
            <Footer loading={context.loading} />
        </>
    );
};

export default Register;
