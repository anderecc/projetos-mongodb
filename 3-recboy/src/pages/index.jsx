import { useSelector } from 'react-redux';

import Container from '@/Components/Container';
import Footer from '@/Components/Footer';
import Head from '@/Components/Head';
import Header from '@/Components/Header';
import Loading from '@/Components/Loading';

export default function Home() {
    const context = useSelector((state) => state.context);

    return (
        <>
            <Head title="Home - recboy" />
            <Header />
            {context.loading ? (
                <Loading />
            ) : (
                <Container home>
                    Aplicação para fechamento de valores, diários e semanais,
                    entre na sua conta ou faça seu cadastro.
                </Container>
            )}
            <Footer loading={context.loading} />
        </>
    );
}
