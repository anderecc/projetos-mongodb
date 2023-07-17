import React, { useState } from 'react';

import styles from '../../styles/closing/dayForm.module.sass';
import getDate from '@/functions/getDate';
import { useDispatch, useSelector } from 'react-redux';
import { contextSetDate } from '@/store/actions/contextActions';
import {
    closingAddValueInDayToEdit,
    closingSetValueDay,
} from '@/store/actions/closingActions';

const DayForm = ({ edit }) => {
    const { month, year } = getDate();
    const dispatch = useDispatch();
    const context = useSelector((state) => state.context);
    const closing = useSelector((state) => state.closing);

    const [dayValue, setDayValue] = useState({
        name: 'FAVARETTO',
        value: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edit) {
            dispatch(closingAddValueInDayToEdit(dayValue));
        } else {
            if (dayValue.value) {
                setDayValue({ ...dayValue, value: '' });

                const date = `${context.date}/${month}/${year}`;
                dispatch(closingSetValueDay(dayValue, date));
            }
        }
    };

    const handleBlur = (value) => {
        let date = value;
        if (date == 0) {
            date = '00';
            return dispatch(contextSetDate(date));
        } else if (date <= 9 && date.toString().length === 1) {
            date = `0${date}`;
            return dispatch(contextSetDate(date));
        } else {
            return dispatch(contextSetDate(date));
        }
    };
    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            {edit ? (
                <p className={styles.title}>
                    Fechamento dia
                    <span>{closing.dayToEdit?.date}</span>
                </p>
            ) : (
                <label className={styles.title}>
                    <span>Fechamento dia</span>
                    <span>
                        <input
                            type="number"
                            value={context.date}
                            onChange={(e) =>
                                dispatch(contextSetDate(e.target.value))
                            }
                            onFocus={() => dispatch(contextSetDate(''))}
                            onBlur={(e) => handleBlur(e.target.value)}
                            min={1}
                            max={31}
                            required
                        />
                        /{month}/{year}
                    </span>
                </label>
            )}
            <select
                className={styles.select}
                value={dayValue.name}
                onChange={(e) =>
                    setDayValue({
                        ...dayValue,
                        name: e.target.value,
                    })
                }
            >
                <option value="FAVARETTO">Favaretto</option>
                <option value="CHICKEN">Chicken</option>
                <option value="SUBWAY">Subway</option>
                <option value="DIPAOLO">Di paolo</option>
                <option value="LABRASA">La brasa</option>
                <option value="ELA">Elã</option>
                <option value="CONCEPT">Concept</option>
                <option value="SATORU">Satoru</option>
                <option value="AKIO">Akio</option>
                <option value="LABIRRA">La birra</option>
                <option value="PADOCA">Padoca</option>
                <option value="DOLCE">Dolce</option>
                <option value="LAFRUTA">La fruta</option>
                <option value="BOCAO">Bocão</option>
                <option value="STEICY">Steicy</option>
                <option value="BAGNARA">Bagnara</option>
                <option value="INABOENO">Ina Boeno</option>
            </select>
            <input
                className={styles.input_value}
                type="number"
                value={dayValue.value}
                onChange={(e) =>
                    setDayValue({
                        ...dayValue,
                        value: +e.target.value,
                    })
                }
                autoFocus
                required
            />
            <input
                type="submit"
                value="Adicionar"
                className={styles.btn_add_value}
            />
        </form>
    );
};

export default DayForm;
