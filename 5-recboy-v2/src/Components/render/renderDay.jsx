import {
    closingDeleteWeek,
    closingWeekSetDayUpdate,
} from '@/store/actions/closingActions';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from '../../styles/render/renderDay.module.sass';

const RenderDay = ({ value, index, actions }) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const renderValues = () => {
        const values = value.values ?? [];
        return values.map((point, i) => {
            return (
                <li key={i} className={styles.point_content}>
                    <p>
                        Ponto:
                        <span> {point.name}</span>
                    </p>
                    <p>
                        Valor: R$ <span>{point.value.toFixed(2)}</span>
                    </p>
                </li>
            );
        });
    };

    return (
        <li className={styles.container}>
            <div className={styles.label_container}>
                <p className={styles.date}>
                    {value.date} <br />
                    <span className={styles.total}>
                        Total: R$ {value.total.toFixed(2)}
                    </span>
                </p>
                {actions ? (
                    <div className={styles.actions_container}>
                        <Link
                            href="/closing/editDay"
                            onClick={() =>
                                dispatch(closingWeekSetDayUpdate(index, value))
                            }
                        >
                            <i className="fa-solid fa-pen"></i>
                        </Link>
                        <button
                            onClick={() => dispatch(closingDeleteWeek(index))}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ) : (
                    false
                )}
                <button
                    onClick={() => setVisible(!visible)}
                    className={styles.btn_render}
                >
                    {visible ? 'Fechar' : 'Abrir'}
                </button>
            </div>
            <ul>{visible ? renderValues() : false}</ul>
        </li>
    );
};

export default RenderDay;
