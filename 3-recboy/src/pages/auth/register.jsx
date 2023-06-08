import React from 'react';
import { useSelector } from 'react-redux';

import Container from '@/Components/Container';
import Loading from '@/Components/Loading';
import Form from '@/Components/auth/Form';
import Layout from '@/Components/Layout';

const Register = () => {
    const context = useSelector((state) => state.context);

    return (
        <Layout title="Cadastrar uma conta" loading={context.loading}>
            {context.loading ? (
                <Loading />
            ) : (
                <Container auth>
                    <Form register />
                </Container>
            )}
        </Layout>
    );
};

export default Register;
