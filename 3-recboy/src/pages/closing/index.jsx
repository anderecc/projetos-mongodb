import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../styles/closing/closing.module.sass';

import {
    closingDay,
    closingDeleteValueDay,
    closingSetValueDay,
    closingUpdateValueDay,
} from '@/store/actions/closingActions';
import { contextSetDate } from '@/store/actions/contextActions';

import Container from '@/Components/Container';
import Loading from '@/Components/Loading';
import getDate from '@/functions/getDate';
import DayList from '@/Components/closing/dayList';
import DayForm from '@/Components/closing/dayForm';
import verifyEmpty from '@/functions/verifyEmpty';
import Layout from '@/Components/Layout';

const Closing = () => {
    const context = useSelector((state) => state.context);
    const closing = useSelector((state) => state.closing);
    const dispatch = useDispatch();
    const { month, year } = getDate();

    const [dayValue, setDayValue] = useState({
        name: 'FAVARETTO',
        value: '',
    });

    const handleSubmit = () => {
        if (verifyEmpty(dayValue.value)) {
            setDayValue({ ...dayValue, value: '' });

            const date = `${context.date}/${month}/${year}`;
            return dispatch(closingSetValueDay(dayValue, date));
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
        <Layout
            title={`Fechamento dia ${context.date}`}
            loading={context.loading}
        >
            {context.loading ? (
                <Loading />
            ) : (
                <Container closing>
                    <h2 className={styles.title}>
                        Fechamento
                        <span>
                            <input
                                className={styles.input}
                                type="number"
                                value={context.date}
                                onChange={(e) =>
                                    dispatch(contextSetDate(e.target.value))
                                }
                                placeholder="Coloque o dia"
                                onFocus={() => dispatch(contextSetDate(''))}
                                onBlur={(e) => handleBlur(e.target.value)}
                                min={0}
                                max={31}
                            />
                            /{month}/{year}
                        </span>
                    </h2>
                    <section>
                        <DayForm
                            submit={handleSubmit}
                            dayValue={dayValue}
                            setDayValue={setDayValue}
                        />
                    </section>
                    <DayList
                        day={closing.day}
                        change={closingUpdateValueDay}
                        delete={closingDeleteValueDay}
                        submit={closingDay}
                    />
                </Container>
            )}
        </Layout>
    );
};

export default Closing;
