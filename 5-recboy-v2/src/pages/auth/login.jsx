import React from 'react';

import Form from '@/Components/auth/Form';
import Layout from '@/Components/Layout';
import Link from 'next/link';

import styles from '../../styles/auth/auth.module.sass';

const Login = () => {
    return (
        <Layout title="Entrar em uma conta" auth>
            <section className={styles.container}>
                <h3 className={styles.title}>Entra na sua conta</h3>
                <Form login />
                <p className={styles.link}>
                    <span>Não tem uma conta?</span>
                    <Link href="/auth/register">Cadastrar uma.</Link>
                </p>
            </section>
        </Layout>
    );
};

export default Login;
