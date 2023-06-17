import React from 'react';
import { useSelector } from 'react-redux';

import {
    closingDay,
    closingDeleteValueDay,
    closingUpdateValueDay,
} from '@/store/actions/closingActions';

import DayList from '@/Components/closing/dayList';
import DayForm from '@/Components/closing/dayForm';
import Layout from '@/Components/Layout';

const Closing = () => {
    const context = useSelector((state) => state.context);
    const closing = useSelector((state) => state.closing);

    return (
        <Layout
            title={`Fechamento dia ${context.date}`}
            loading={context.loading}
            closing
        >
            <section>
                <DayForm />
            </section>
            <DayList
                day={closing.day}
                change={closingUpdateValueDay}
                del={closingDeleteValueDay}
                submit={closingDay}
            />
        </Layout>
    );
};

export default Closing;
