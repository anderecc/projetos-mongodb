import Container from '@/Components/Container';
import Footer from '@/Components/Footer';
import Head from '@/Components/Head';
import Header from '@/Components/Header';
import Loading from '@/Components/Loading';
import DayForm from '@/Components/closing/dayForm';
import DayList from '@/Components/closing/dayList';
import {
    closingAddValueInDayToEdit,
    closingUpdateDayInWeek,
    closingWeekChangeValueDay,
    closingWeekDeleteValueDay,
} from '@/store/actions/closingActions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditDay = () => {
    const closing = useSelector((state) => state.closing);
    const context = useSelector((state) => state.context);
    const dispatch = useDispatch();
    const { push } = useRouter();

    const [dayValues, setDayValues] = useState({
        name: 'FAVARETTO',
        value: '',
    });

    useEffect(() => {
        if (closing.dayToEdit.index === null) push('/dashboard');
    }, [closing.dayToEdit.index]);

    const handleSubmit = () => {
        dispatch(closingAddValueInDayToEdit(dayValues));
    };

    return (
        <>
            <Head />
            <Header />
            {context.loading ? (
                <Loading />
            ) : (
                <Container>
                    <h2>
                        <span>Fechamento - </span>
                        {closing.dayToEdit?.date}
                    </h2>
                    <section>
                        <DayForm
                            submit={handleSubmit}
                            dayValues={dayValues}
                            setDayValues={setDayValues}
                        />
                    </section>
                    <DayList
                        day={closing.dayToEdit}
                        change={closingWeekChangeValueDay}
                        delete={closingWeekDeleteValueDay}
                        submit={closingUpdateDayInWeek}
                        edit
                    />
                </Container>
            )}
            <Footer />
        </>
    );
};

export default EditDay;
