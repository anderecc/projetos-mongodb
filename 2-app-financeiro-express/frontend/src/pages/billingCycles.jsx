import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { showTab } from '../store/actions/tabsActions';
import {
    createItem,
    updateItem,
    deleteItem,
} from '../store/actions/billingCyclesActions';

import Container from '../components/Container';
import ContentHeader from '../components/Content/ContentHeader';
import Content from '../components/Content/Content';
import Tabs from '../components/Tabs/Tabs';
import TabsContent from '../components/Tabs/TabsContent';
import TabContent from '../components/Tabs/TabContent';
import TabsHeader from '../components/Tabs/TabsHeader';
import TabHeader from '../components/Tabs/TabHeader';
import List from '../components/Layout/List';
import Form from '../components/Layout/Form';

class BillingCycles extends Component {
    render() {
        return (
            <Container>
                <ContentHeader title="Ciclos de pagamento" small="Cadastro" />
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader
                                label="Listar"
                                icon="fa-solid fa-bars"
                                link="#"
                                target="tabList"
                                active={
                                    this.props.tabs.showTab === 'tabList'
                                        ? true
                                        : false
                                }
                                showTab={this.props.showTab}
                            />
                            <TabHeader
                                label="Incluir"
                                icon="fa-solid fa-plus"
                                link="#"
                                target="tabAdd"
                                active={
                                    this.props.tabs.showTab === 'tabAdd'
                                        ? true
                                        : false
                                }
                                showTab={this.props.showTab}
                            />
                            <TabHeader
                                label="Alterar"
                                icon="fa-solid fa-pencil"
                                link="#"
                                target="tabEdit"
                                active={
                                    this.props.tabs.showTab === 'tabEdit'
                                        ? true
                                        : false
                                }
                                showTab={this.props.showTab}
                            />
                            <TabHeader
                                label="Excluir"
                                icon="fa-solid fa-trash"
                                link="#"
                                target="tabDelete"
                                active={
                                    this.props.tabs.showTab === 'tabDelete'
                                        ? true
                                        : false
                                }
                                showTab={this.props.showTab}
                            />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent
                                active={
                                    this.props.tabs.showTab === 'tabList'
                                        ? true
                                        : false
                                }
                            >
                                <List />
                            </TabContent>
                            <TabContent
                                active={
                                    this.props.tabs.showTab === 'tabAdd'
                                        ? true
                                        : false
                                }
                            >
                                <Form fn={this.props.createItem} />
                            </TabContent>
                            <TabContent
                                active={
                                    this.props.tabs.showTab === 'tabEdit'
                                        ? true
                                        : false
                                }
                            >
                                <Form
                                    fn={this.props.updateItem}
                                    btn="btn-success"
                                    label="Alterar"
                                />
                            </TabContent>
                            <TabContent
                                active={
                                    this.props.tabs.showTab === 'tabDelete'
                                        ? true
                                        : false
                                }
                            >
                                <Form
                                    fn={this.props.deleteItem}
                                    btn="btn-danger"
                                    label="Excluir"
                                    readOnly
                                />
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </Container>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        tabs: state.tabs,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators(
            { showTab, createItem, updateItem, deleteItem },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycles);
