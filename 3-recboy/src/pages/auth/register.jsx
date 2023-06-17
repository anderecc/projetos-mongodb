import React from 'react';

import Form from '@/Components/auth/Form';
import Layout from '@/Components/Layout';

const Register = () => {
    return (
        <Layout title="Cadastrar uma conta" auth>
            <Form register />
        </Layout>
    );
};

export default Register;
