import React from 'react';
import HeadApp from './Head';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';
import Loading from './widget/Loading';
import { useSelector } from 'react-redux';
import Messages from './widget/Message';

const Layout = (props) => {
    const context = useSelector((state) => state.context);

    return (
        <>
            <HeadApp title={props.title} />
            <Header />
            <Messages />
            <Container
                home={props.home}
                dashboard={props.dashboard}
                closing={props.closing}
                auth={props.auth}
            >
                {props.children}
            </Container>
            {context.loading ? <Loading /> : false}
            <Footer loading={context.loading} />
        </>
    );
};

export default Layout;
