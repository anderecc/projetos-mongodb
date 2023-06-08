import React from 'react';
import HeadApp from './Head';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
    return (
        <>
            <HeadApp title={props.title} />
            <Header />
            {props.children}
            <Footer loading={props.loading} />
        </>
    );
};

export default Layout;
