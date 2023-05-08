import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../styles/dashboard/aggragateList.module.sass';
import {
    contextChangePercent,
    contextChangeValue,
    contextSetWeekToPdf,
} from '@/store/actions/contextActions';
import Link from 'next/link';

const AggregateList = () => {
    const closing = useSelector((state) => state.closing);
    const context = useSelector((state) => state.context);
    const dispatch = useDispatch();

    const verifyWeek = (week) => {
        return (
            <h3 className={styles.title}>
                <span>
                    {`${week.values[0].date} - ${
                        week.values[week.values.length - 1].date
                    }`}
                </span>
                <span>Total semana: R$ {week.total.toFixed(2)}</span>
                <Link
                    style={{ color: 'darkGreen' }}
                    href={'/generatePDF'}
                    onClick={() => dispatch(contextSetWeekToPdf(week))}
                >
                    <i className="fa-solid fa-share"></i>
                </Link>
            </h3>
        );
    };

    const renderDay = (day) => {
        const values = day.values || [];
        return values.map((item, index) => {
            return (
                <li key={index} className={styles.item_content}>
                    <p>Ponto: {item.name}</p>
                    <strong> Total dia: R${item.value.toFixed(2)}</strong>
                </li>
            );
        });
    };

    const renderWeek = (week) => {
        const values = week.values || [];
        return values.map((item, index) => {
            return (
                <details key={index} className={styles.details}>
                    <summary className={`details ${styles.summary}`}>
                        <span>{item.date}</span>
                        <strong>Total: R$ {item.total.toFixed(2)}</strong>
                    </summary>
                    <ul className={styles.item_container}>{renderDay(item)}</ul>
                </details>
            );
        });
    };

    const renderAggregate = () => {
        const aggregate = closing.aggregate.values || [];
        return aggregate.map((item, index) => {
            if (item.values.length !== 0) {
                return (
                    <article key={index} className={styles.container}>
                        {verifyWeek(item)}
                        {renderWeek(item)}
                    </article>
                );
            }
        });
    };

    const computeValue = () => {
        return context.value - context.value * (context.percent / 100);
    };

    return (
        <section>
            <article>
                <div className={styles.compute_container}>
                    <div>
                        <div>
                            <label htmlFor="valueTotal">Total</label>
                            <input
                                className={styles.input}
                                type="number"
                                value={context.value}
                                placeholder="Insira o valor total"
                                id="valueTotal"
                                onChange={(e) =>
                                    dispatch(contextChangeValue(e.target.value))
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="percent">Porcentagem</label>
                            <input
                                className={styles.input}
                                type="number"
                                value={context.percent}
                                placeholder="Insira sua porcentagem"
                                id="percent"
                                onChange={(e) =>
                                    dispatch(
                                        contextChangePercent(e.target.value)
                                    )
                                }
                            />
                        </div>
                    </div>
                    <p>
                        <span>{context.value}</span> -{' '}
                        <span>{context.percent}%</span> ={' '}
                        <strong>R$ {computeValue().toFixed(2)}</strong>
                    </p>
                </div>
            </article>
            {renderAggregate()}
        </section>
    );
};

export default AggregateList;
