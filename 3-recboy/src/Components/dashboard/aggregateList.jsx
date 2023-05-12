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
            <summary className={`details ${styles.title}`}>
                <div>
                    <strong>
                        {`${week.values[0].date} - ${
                            week.values[week.values.length - 1].date
                        }`}
                    </strong>
                    <strong>Total semana: R$ {week.total.toFixed(2)}</strong>
                </div>
                <Link
                    className={styles.btn_share}
                    href={'/generatePDF'}
                    onClick={() => dispatch(contextSetWeekToPdf(week))}
                >
                    <i className="fa-solid fa-share"></i>
                </Link>
            </summary>
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
                <div key={index} className={styles.week_container}>
                    <h3>
                        <span>{item.date}</span>
                        <strong>Total: R$ {item.total.toFixed(2)}</strong>
                    </h3>
                    <ul className={styles.item_container}>{renderDay(item)}</ul>
                </div>
            );
        });
    };

    const renderAggregate = () => {
        const aggregate = closing.aggregate.values || [];
        return aggregate.map((item, index) => {
            if (item.values.length !== 0) {
                return (
                    <article key={index}>
                        <details className={styles.container}>
                            {verifyWeek(item)}
                            {renderWeek(item)}
                        </details>
                        <hr />
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
                <hr />
            </article>
            {renderAggregate()}
        </section>
    );
};

export default AggregateList;
