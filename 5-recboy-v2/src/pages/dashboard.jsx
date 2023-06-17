import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles/dashboard/dashboard.module.sass';

import Layout from '@/Components/Layout';
import WeekList from '@/Components/dashboard/weekList';
import AggregateList from '@/Components/dashboard/aggregateList';

const Dashboard = () => {
    const context = useSelector((state) => state.context);
    const [visible, setVisible] = useState('week');

    return (
        <Layout title="Resumo fechamento" loading={context.loading} dashboard>
            <div className={styles.see_container}>
                <button
                    className={`${visible === 'week' ? styles.active : ''}`}
                    onClick={() => setVisible('week')}
                >
                    Semana
                </button>
                <button
                    onClick={() => setVisible('aggregate')}
                    className={`${
                        visible === 'aggregate' ? styles.active : ''
                    }`}
                >
                    Agregado
                </button>
            </div>
            {visible === 'week' ? (
                <WeekList />
            ) : visible === 'aggregate' ? (
                <AggregateList />
            ) : (
                false
            )}
        </Layout>
    );
};

export default Dashboard;
