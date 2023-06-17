import React from 'react';

import Form from '@/Components/auth/Form';
import Layout from '@/Components/Layout';

const Login = () => {
    return (
        <Layout title="Entrar em uma conta" auth>
            <Form change />
        </Layout>
    );
};

export default Login;
