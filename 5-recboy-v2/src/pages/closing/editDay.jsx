import Layout from '@/Components/Layout';
import DayForm from '@/Components/closing/dayForm';
import DayList from '@/Components/closing/dayList';
import {
    closingUpdateDayInWeek,
    closingWeekChangeValueDay,
    closingWeekDeleteValueDay,
} from '@/store/actions/closingActions';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const EditDay = () => {
    const closing = useSelector((state) => state.closing);
    const context = useSelector((state) => state.context);
    const { push } = useRouter();

    useEffect(() => {
        if (closing.dayToEdit.index === null) push('/dashboard');
    }, [closing.dayToEdit.index]);

    return (
        <Layout
            title={`Editar dia ${closing.dayToEdit?.date}`}
            loading={context.loading}
            closing
        >
            <section>
                <DayForm edit />
            </section>
            <DayList
                day={closing.dayToEdit}
                change={closingWeekChangeValueDay}
                del={closingWeekDeleteValueDay}
                submit={closingUpdateDayInWeek}
                edit
            />
        </Layout>
    );
};

export default EditDay;
