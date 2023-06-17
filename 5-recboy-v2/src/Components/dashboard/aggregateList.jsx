import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/dashboard/aggragateList.module.sass';

import RenderWeek from '../render/renderWeek';

const AggregateList = () => {
    const closing = useSelector((state) => state.closing);

    const [compute, setCompute] = useState({ value: 0, percent: 0 });

    const renderAggregate = () => {
        const values = closing.aggregate.values ?? [];
        return values.map((week, i) => {
            return <RenderWeek key={i} value={week} actions={false} />;
        });
    };

    const computeValue = () => {
        return compute.value - compute.value * (compute.percent / 100);
    };

    return (
        <section className={styles.container}>
            <h3>Resumo das suas semanas encerradas</h3>
            <article>
                <div className={styles.compute_container}>
                    <div>
                        <div>
                            <label>Total</label>
                            <input
                                className={styles.input}
                                type="number"
                                value={compute.value}
                                onChange={(e) =>
                                    setCompute({
                                        ...compute,
                                        value: e.target.value,
                                    })
                                }
                                min={0}
                                max={9999}
                            />
                        </div>
                        <div>
                            <label>Porcentagem</label>
                            <input
                                className={styles.input}
                                type="number"
                                value={compute.percent}
                                onChange={(e) =>
                                    setCompute({
                                        ...compute,
                                        percent: e.target.value,
                                    })
                                }
                                min={0}
                                max={9999}
                            />
                        </div>
                    </div>
                    <p>
                        <span>{compute.value}</span> -{' '}
                        <span>{compute.percent}%</span> ={' '}
                        <strong>R$ {computeValue().toFixed(2)}</strong>
                    </p>
                </div>
                <hr />
            </article>
            <article>
                <ul>{renderAggregate()}</ul>
            </article>
        </section>
    );
};

export default AggregateList;
