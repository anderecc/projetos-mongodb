import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../styles/dashboard/weeklist.module.sass';

import { closingWeek } from '@/store/actions/closingActions';
import RenderDay from '../render/renderDay';

const WeekList = () => {
    const closing = useSelector((state) => state.closing);
    const dispatch = useDispatch();

    const renderItems = () => {
        const values = closing.week.values ?? [];
        return values.map((day, i) => {
            return <RenderDay key={i} value={day} actions index={i} />;
        });
    };

    return (
        <section className={styles.container}>
            <h3>Resumo da sua semana atual</h3>
            <ul className={styles.item_content}>{renderItems()}</ul>
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
        </section>
    );
};

export default WeekList;
