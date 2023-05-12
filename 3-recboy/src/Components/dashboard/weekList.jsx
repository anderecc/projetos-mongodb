import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../styles/dashboard/weeklist.module.sass';

import {
    closingDeleteWeek,
    closingWeek,
    closingWeekSetDayUpdate,
} from '@/store/actions/closingActions';

const WeekList = () => {
    const closing = useSelector((state) => state.closing);
    const dispatch = useDispatch();

    const renderValues = (values) => {
        return values.map((item, index) => {
            return (
                <li key={index} className={styles.item_content}>
                    <p>Ponto: {item.name}</p>
                    <strong> Total dia: R${item.value.toFixed(2)}</strong>
                </li>
            );
        });
    };

    const renderItems = () => {
        return closing.week.values.map((item, index) => {
            return (
                <div key={index} className={styles.week_container}>
                    <details className={styles.details}>
                        <summary className={`details ${styles.summary}`}>
                            <div className={styles.title_container}>
                                <span>{item.date}</span>
                                <span>Total: R$ {item.total.toFixed(2)}</span>
                            </div>
                            <div className={styles.btn_container}>
                                <Link
                                    href="/closing/editDay"
                                    onClick={() =>
                                        dispatch(
                                            closingWeekSetDayUpdate(index, item)
                                        )
                                    }
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </Link>
                                <button
                                    onClick={() =>
                                        dispatch(closingDeleteWeek(index))
                                    }
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </summary>
                        <ul className={styles.item_container}>
                            {renderValues(item.values)}
                        </ul>
                    </details>
                </div>
            );
        });
    };

    return (
        <article className={styles.container}>
            {renderItems()}
            <p className={styles.total_week}>
                Total semana: R${closing.week.total.toFixed(2)}{' '}
            </p>
            <p className="text-warning">{closing.errors?.weekNoValues}</p>
            <div className={styles.btn_end_container}>
                <button
                    className={styles.btn_closing_week}
                    onClick={() => dispatch(closingWeek())}
                >
                    Encerrar semana
                </button>
                <Link href={'/closing'}>Adicionar dia</Link>
            </div>
        </article>
    );
};

export default WeekList;
