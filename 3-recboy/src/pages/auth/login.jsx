import React from 'react';
import { useSelector } from 'react-redux';

import Container from '@/Components/Container';
import Form from '@/Components/auth/Form';
import Loading from '@/Components/Loading';
import Layout from '@/Components/Layout';

const Login = () => {
    const context = useSelector((state) => state.context);

    return (
        <Layout title="Entrar em uma conta" loading={context.loading}>
            {context.loading ? (
                <Loading />
            ) : (
                <Container auth>
                    <Form change />
                </Container>
            )}
        </Layout>
    );
};

export default Login;
