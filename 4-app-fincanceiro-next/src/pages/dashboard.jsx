import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSummary } from '../store/actions/dashboardActions';

import ContentHeader from '../components/Content/ContentHeader';
import Content from '../components/Content/Content';
import Container from '../components/Container';
import ValueBox from '../components/Widget/ValueBox';
import Row from '../components/Layout/Row';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeadPage from '@/components/Head';

let Dashboard = () => {
    const dashboard = useSelector((state) => state.dashboard);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { credit, debit } = dashboard.summary[0];

    useEffect(() => {
        dispatch(getSummary(auth.userToken));
    }, [auth.userToken]);

    return (
        <>
            <HeadPage title="Dashboard" />
            <Header />
            <Container>
                <ContentHeader title="Dashboard" small="Versão 1.0" />
                <Content>
                    <Row>
                        <ValueBox
                            cols="12 4"
                            color="green"
                            icon="fa-solid fa-building-columns"
                            value={`R$: ${credit}`}
                            text="Total de Créditos"
                        />
                        <ValueBox
                            cols="12 4"
                            color="red"
                            icon="fa-solid fa-credit-card"
                            value={`R$: ${debit}`}
                            text="Total de Débitos"
                        />
                        <ValueBox
                            cols="12 4"
                            color="blue"
                            icon="fa-solid fa-money-bill"
                            value={`R$: ${+credit - +debit}`}
                            text="Valor consolidado "
                        />
                    </Row>
                </Content>
            </Container>
            <Footer />
        </>
    );
};

export default Dashboard;
