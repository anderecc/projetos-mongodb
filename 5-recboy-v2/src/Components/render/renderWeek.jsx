import { contextSetWeekToPdf } from '@/store/actions/contextActions';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import RenderDay from './renderDay';

import styles from '../../styles/render/renderWeek.module.sass';

const RenderWeek = ({ value, actions }) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const renderLabel = () => {
        const values = value.values ?? [];
        if (values.length !== 0)
            return (
                <div>
                    <p>
                        <span>
                            {values[0]?.date}-{values[values.length - 1]?.date}
                        </span>
                        <span>R$: {value.total?.toFixed(2)}</span>
                    </p>
                    <div>
                        <Link
                            href={'/generatePDF'}
                            onClick={() => dispatch(contextSetWeekToPdf(value))}
                        >
                            <i className="fa-solid fa-share"></i>
                        </Link>
                        <button onClick={() => setVisible(!visible)}>
                            {visible ? 'Fechar' : 'Abrir'}
                        </button>
                    </div>
                </div>
            );
    };

    const renderValues = () => {
        const values = value.values ?? [];
        return values.map((day, i) => {
            return (
                <RenderDay key={i} value={day} actions={actions} index={i} />
            );
        });
    };

    return (
        <li className={styles.container}>
            <div className={styles.label_container}>{renderLabel()}</div>
            {visible ? (
                <ul className={styles.content}>{renderValues()}</ul>
            ) : (
                false
            )}
        </li>
    );
};

export default RenderWeek;
