import { useSelector } from 'react-redux';

import styles from '../styles/home.module.sass';

import Link from 'next/link';
import Layout from '@/Components/Layout';

export default function Home() {
    const context = useSelector((state) => state.context);
    const auth = useSelector((state) => state.auth);

    return (
        <Layout
            title="RECBOY - Entre ou cadastre uma conta"
            loading={context.loading}
            home
        >
            <section className={styles.container}>
                <div>
                    <p>
                        Facilite seus fechamentos, tenha controle e resumo de
                        suas semanas.
                    </p>
                    <p>Cadastre uma conta ou entre na sua.</p>
                </div>
                {auth.userToken ? (
                    false
                ) : (
                    <div className={styles.links_container}>
                        <Link href={'/auth/login'}>Entrar</Link>
                        <Link href={'/auth/register'}>Cadastrar-se</Link>
                    </div>
                )}
            </section>
        </Layout>
    );
}
