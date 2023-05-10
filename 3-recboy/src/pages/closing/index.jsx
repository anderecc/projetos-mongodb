import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../styles/closing/closing.module.sass';

import Container from '@/Components/Container';
import Footer from '@/Components/Footer';
import Head from '@/Components/Head';
import Header from '@/Components/Header';
import Loading from '@/Components/Loading';
import getDate from '@/functions/getDate';
import {
    closingDay,
    closingDeleteValueDay,
    closingSetValueDay,
    closingUpdateValueDay,
} from '@/store/actions/closingActions';
import DayList from '@/Components/closing/dayList';
import { contextSetDate } from '@/store/actions/contextActions';
import DayForm from '@/Components/closing/dayForm';

const Closing = () => {
    const context = useSelector((state) => state.context);
    const closing = useSelector((state) => state.closing);
    const dispatch = useDispatch();
    const { month, year } = getDate();

    const [dayValues, setDayValues] = useState({
        name: 'FAVARETTO',
        value: '',
    });

    const handleSubmit = () => {
        setDayValues({ ...dayValues, value: '' });
        const currentDate = context.date;
        const currentMonth = month < 10 ? `0${month}` : `${month}`;
        const currentYear = `${year}`;
        const date = `${currentDate}/${currentMonth}/${currentYear}`;
        return dispatch(closingSetValueDay(dayValues, date));
    };

    return (
        <>
            <Head title="Fechamento - recboy" />
            <Header />
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
                                placeholder="Coloque o dia"
                                onChange={(e) =>
                                    dispatch(contextSetDate(e.target.value))
                                }
                                onFocus={(e) => (e.target.value = '')}
                            />
                            /{month < 10 ? `0${month}` : month}/{year}
                        </span>
                    </h2>
                    <section>
                        <DayForm
                            submit={handleSubmit}
                            dayValues={dayValues}
                            setDayValues={setDayValues}
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
            <Footer loading={context.loading} />
        </>
    );
};

export default Closing;
