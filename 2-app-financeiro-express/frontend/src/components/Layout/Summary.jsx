import React from 'react';

import Grid from './Grid';
import Row from './Row';
import ValueBox from '../Widget/ValueBox';

const Summary = (props) => {
    let { credit, debit } = props;

    return (
        <Grid cols="12">
            <legend>Resumo</legend>
            <Row>
                <ValueBox
                    cols="12 4"
                    color="green"
                    icon="fa-solid fa-building-columns"
                    value={`R$: ${credit}`}
                    text="Total de Créditos"
                />
                <ValueBox
                    cols="12 4"
                    color="red"
                    icon="fa-solid fa-credit-card"
                    value={`R$: ${debit}`}
                    text="Total de Débitos"
                />
                <ValueBox
                    cols="12 4"
                    color="blue"
                    icon="fa-solid fa-money-bill"
                    value={`R$: ${credit - debit}`}
                    text="Valor consolidado "
                />
            </Row>
        </Grid>
    );
};

export default Summary;
