import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@/Components/Container';
import Layout from '@/Components/Layout';
import Loading from '@/Components/Loading';
import { adminGetDatas } from '@/store/actions/adminActions';

import styles from '../../styles/admin/admin.module.sass';
import computeTotalPoints from '@/functions/computeTotalPoints';

const Admin = () => {
    const context = useSelector((state) => state.context);
    const auth = useSelector((state) => state.auth);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const [openWeek, setOpenWeek] = useState(null);

    useEffect(() => {
        dispatch(adminGetDatas());
    }, []);

    const renderTotalPoints = (values) => {
        const result = computeTotalPoints(values);
        return result?.map((item, index) => {
            return (
                <li key={index}>
                    <p style={{ display: 'flex', gap: '1rem' }}>
                        <span>Total ponto: {item.name}</span>
                        <strong> R$ {item.value}</strong>
                    </p>
                </li>
            );
        });
    };

    const renderDayValues = (values) => {
        return values?.map((value, index) => {
            return (
                <li key={index}>
                    <span>{value.name}</span>:<strong>{value.value}</strong>
                </li>
            );
        });
    };

    const renderWeekValues = (day) => {
        return (
            <div>
                <p>
                    <strong>{day.date}</strong>{' '}
                    <strong>Total: {day.total}</strong>
                </p>
                <div>
                    <ul>{renderDayValues(day.values)}</ul>
                </div>
            </div>
        );
    };

    const renderWeek = (week) => {
        return week?.values.map((day, index) => {
            return (
                <li className={styles.value_week_container} key={index}>
                    {renderWeekValues(day)}
                </li>
            );
        });
    };

    const renderAggregate = (user) => {
        return user.data?.aggregate?.values.map((week, index) => {
            const initDate = week.values[0]?.date ?? '';
            const endDate = week.values[week.values.length - 1]?.date ?? '';
            if (week.values.length !== 0) {
                return (
                    <div key={index} className={styles.aggregate_content}>
                        <div className={styles.aggregate_week_title}>
                            <h3 style={{ cursor: 'pointer' }}>
                                <span>
                                    {initDate} - {endDate}
                                </span>
                                <span>R$ {week.total.toFixed(2)}</span>
                            </h3>
                            <button
                                onClick={() =>
                                    setOpenWeek(
                                        openWeek == index ? null : index
                                    )
                                }
                            >
                                Clique para abrir ou fechar
                            </button>
                        </div>
                        {openWeek == index ? (
                            <ul
                                className={
                                    styles.aggregate_week_values_container
                                }
                            >
                                {renderWeek(week)}
                            </ul>
                        ) : (
                            false
                        )}
                        <ul className={styles.total_points_container}>
                            <h4>Total do ponto na semana</h4>
                            {renderTotalPoints(week.values)}
                        </ul>
                    </div>
                );
            }
        });
    };

    const renderUsers = () => {
        return admin.users?.map((user, index) => {
            return (
                <article key={index} className={styles.user_container}>
                    <h2 className={styles.user_name}>{user.name}</h2>
                    <div className={styles.user_content}>
                        <details>
                            <summary className={`details`}>
                                <h3>Fechamento da Semana</h3>
                            </summary>
                            {user.data.week.values.length !== 0 ? (
                                <ul className={styles.week_container}>
                                    {renderWeek(user.data.week)}
                                </ul>
                            ) : (
                                <div>
                                    <p>Usuário não tem dados para exibir.</p>
                                </div>
                            )}
                        </details>
                        <details>
                            <summary className={`details`}>
                                <h3>Agregado</h3>
                            </summary>
                            {user.data.aggregate.values[0].values.length !==
                            0 ? (
                                <div className={styles.aggregate_container}>
                                    {renderAggregate(user)}
                                </div>
                            ) : (
                                <div>
                                    <p>Usuário não tem dados para exibir.</p>
                                </div>
                            )}
                        </details>
                    </div>
                </article>
            );
        });
    };

    return (
        <Layout title={`Admin - ${auth.user.name}`} loading={context.loading}>
            {context.loading ? (
                <Loading />
            ) : (
                <Container>
                    <section className={styles.container}>
                        {renderUsers()}
                    </section>
                </Container>
            )}
        </Layout>
    );
};

export default Admin;
