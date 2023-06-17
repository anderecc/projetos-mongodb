import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles/dashboard/dashboard.module.sass';

import WeekList from '@/Components/dashboard/weekList';
import AggregateList from '@/Components/dashboard/aggregateList';
import Layout from '@/Components/Layout';

const Dashboard = () => {
    const context = useSelector((state) => state.context);
    const [visible, setVisible] = useState('week');

    return (
        <Layout title="Resumo fechamento" loading={context.loading} dashboard>
            <div className={styles.btn_container}>
                <button
                    className={visible === 'week' ? styles.active : ''}
                    onClick={() => setVisible('week')}
                >
                    Mostrar semana
                </button>
                <button
                    className={visible === 'aggregate' ? styles.active : ''}
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
        </Layout>
    );
};

export default Dashboard;
