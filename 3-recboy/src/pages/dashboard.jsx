import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles/dashboard/dashboard.module.sass';

import Container from '@/Components/Container';
import Footer from '@/Components/Footer';
import Head from '@/Components/Head';
import Header from '@/Components/Header';
import Loading from '@/Components/Loading';
import WeekList from '@/Components/dashboard/weekList';
import AggregateList from '@/Components/dashboard/aggregateList';

const Dashboard = () => {
    const context = useSelector((state) => state.context);
    const [visible, setVisible] = useState('week');

    return (
        <>
            <Head title="Resumo - recboy" />
            <Header />
            {context.loading ? (
                <Loading />
            ) : (
                <Container dashboard>
                    <div className={styles.btn_container}>
                        <button
                            className={visible === 'week' ? styles.active : ''}
                            onClick={() => setVisible('week')}
                        >
                            Mostrar semana
                        </button>
                        <button
                            className={
                                visible === 'aggregate' ? styles.active : ''
                            }
                            onClick={() => setVisible('aggregate')}
                        >
                            Mostrar agregado
                        </button>
                    </div>
                    <section className={styles.container}>
                        {visible === 'week' ? (
                            <WeekList />
                        ) : visible === 'aggregate' ? (
                            <AggregateList />
                        ) : (
                            false
                        )}
                    </section>
                </Container>
            )}
            <Footer loading={context.loading} />
        </>
    );
};

export default Dashboard;
