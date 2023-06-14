import { useSelector } from 'react-redux';

import styles from '../styles/home.module.sass';

import Container from '@/Components/Container';
import Loading from '@/Components/Loading';
import Link from 'next/link';
import Layout from '@/Components/Layout';

export default function Home() {
    const context = useSelector((state) => state.context);
    const auth = useSelector((state) => state.auth);

    return (
        <Layout
            title="RECBOY - Entre ou cadastre uma conta"
            loading={context.loading}
        >
            {context.loading ? (
                <Loading />
            ) : (
                <Container home>
                    <section className={styles.container}>
                        <p>
                            Aplicação para fechamento de valores, diários e
                            semanais, entre na sua conta ou faça seu cadastro.
                        </p>
                        {auth.userToken ? (
                            false
                        ) : (
                            <div className={styles.links_container}>
                                <Link href={'/auth/login'}>Entrar</Link>
                                <Link href={'/auth/register'}>
                                    Cadastrar-se
                                </Link>
                            </div>
                        )}
                    </section>
                </Container>
            )}
        </Layout>
    );
}
