import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { getSummary } from '../store/actions/dashboardActions';

import ContentHeader from '../components/Content/ContentHeader';
import Content from '../components/Content/Content';
import Container from '../components/Container';
import ValueBox from '../components/Widget/ValueBox';
import Row from '../components/Layout/Row';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getSummary();
    }

    render() {
        let { credit, debit } = this.props.summary;

        return (
            <Container>
                <ContentHeader title="Dashboard" small="Versão 1.0" />
                <Content>
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
                            value={`R$: ${+credit - +debit}`}
                            text="Valor consolidado "
                        />
                    </Row>
                </Content>
            </Container>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        summary: state.dashboard.summary,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({ getSummary }, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
