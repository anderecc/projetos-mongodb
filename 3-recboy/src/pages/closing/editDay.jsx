import Container from '@/Components/Container';
import Layout from '@/Components/Layout';
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

    const [dayValue, setDayValue] = useState({
        name: 'FAVARETTO',
        value: '',
    });

    useEffect(() => {
        if (closing.dayToEdit.index === null) push('/dashboard');
    }, [closing.dayToEdit.index]);

    const handleSubmit = () => {
        dispatch(closingAddValueInDayToEdit(dayValue));
    };

    return (
        <Layout
            title={`Editar dia ${closing.dayToEdit?.date}`}
            loading={context.loading}
        >
            {context.loading ? (
                <Loading />
            ) : (
                <Container closing>
                    <h3
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '1.4rem',
                        }}
                    >
                        <span>Fechamento</span>
                        <span>{closing.dayToEdit?.date}</span>
                    </h3>
                    <section>
                        <DayForm
                            submit={handleSubmit}
                            dayValue={dayValue}
                            setDayValue={setDayValue}
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
        </Layout>
    );
};

export default EditDay;
