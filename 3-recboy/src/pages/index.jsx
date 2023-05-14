import { useSelector } from 'react-redux';

import styles from '../styles/home.module.sass';

import Container from '@/Components/Container';
import Footer from '@/Components/Footer';
import Head from '@/Components/Head';
import Header from '@/Components/Header';
import Loading from '@/Components/Loading';
import Link from 'next/link';

export default function Home() {
    const context = useSelector((state) => state.context);
    const auth = useSelector((state) => state.auth);

    return (
        <>
            <Head title="Home - recboy" />
            <Header />
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
            <Footer loading={context.loading} />
        </>
    );
}
