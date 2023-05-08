import Container from '@/components/Container';
import Footer from '@/components/Footer';
import HeadPage from '@/components/Head';
import Header from '@/components/Header';

export default function Home() {
    return (
        <>
            <HeadPage title="Coooder Financeiro" />
            <Header />
            <Container classList="d-flex justify-content-center gap-3 align-items-center ">
                <section className="fs-5 w-50 text-center">
                    <h4>Projeto de estudo</h4>
                    <p>
                        Nesse projeto Utilizei o Next.js, utilizei a API do
                        Next.js, utilizei mongoDB (Mongoose), Redux,
                        JsonWebToken (também {`"Jose"`}), Cookies-next, Bcrypt,
                        Admin-lte, BootStrap e FontAwesome.
                    </p>

                    {/* <p>
                        Aprendi muito nesse projeto, fechei as rotas da
                        aplicação com middleware, na qual o usuário só pode
                        entrar na aplicação caso for passado um token válido que
                        é gerado somente quando o mesmo faz signIn ou signUP,
                        também fechei as rotas da api, na qual só podem ser
                        acessadas se for passado um header com um token válido.
                        Foquei bastante na parte de segurança nesse projeto e
                        usabilidade do usuário, ainda tenho ideias em mente para
                        complementar ainda mais o mesmo.
                    </p> */}
                </section>
            </Container>

            <Footer />
        </>
    );
}
