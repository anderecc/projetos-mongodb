import React from 'react';

import Form from '@/Components/auth/Form';
import Layout from '@/Components/Layout';

import styles from '../../styles/auth/auth.module.sass';
import Link from 'next/link';

const Register = () => {
    return (
        <Layout title="Cadastrar uma conta" auth>
            <section
                className={`${styles.container} ${styles.register_container}`}
            >
                <h3 className={styles.title}>Cadastrar uma conta</h3>
                <Form />
                <p className={styles.link}>
                    <span>Já tem uma conta?</span>
                    <Link href="/auth/login">Entre nela.</Link>
                </p>
            </section>
        </Layout>
    );
};

export default Register;
