import { useDispatch, useSelector } from 'react-redux';

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
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeadPage from '@/components/Head';

let BillingCycles = () => {
    const tabs = useSelector((state) => state.tabs);
    const dispatch = useDispatch();

    let handleShowTab = (value) => {
        return dispatch(showTab(value));
    };

    let handleDeleteItem = () => {
        return dispatch(deleteItem());
    };

    let handleUpdateItem = (values) => {
        return dispatch(updateItem(values));
    };

    let handleCreateItem = (values) => {
        return dispatch(createItem(values));
    };

    return (
        <>
            <HeadPage title="Ciclos de pagamento" />
            <Header />
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
                                    tabs.showTab === 'tabList' ? true : false
                                }
                                showTab={handleShowTab}
                            />
                            <TabHeader
                                label="Incluir"
                                icon="fa-solid fa-plus"
                                link="#"
                                target="tabAdd"
                                active={
                                    tabs.showTab === 'tabAdd' ? true : false
                                }
                                showTab={handleShowTab}
                            />
                            <TabHeader
                                label="Alterar"
                                icon="fa-solid fa-pencil"
                                link="#"
                                target="tabEdit"
                                active={
                                    tabs.showTab === 'tabEdit' ? true : false
                                }
                                showTab={handleShowTab}
                            />
                            <TabHeader
                                label="Excluir"
                                icon="fa-solid fa-trash"
                                link="#"
                                target="tabDelete"
                                active={
                                    tabs.showTab === 'tabDelete' ? true : false
                                }
                                showTab={handleShowTab}
                            />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent
                                active={
                                    tabs.showTab === 'tabList' ? true : false
                                }
                            >
                                <List />
                            </TabContent>
                            <TabContent
                                active={
                                    tabs.showTab === 'tabAdd' ? true : false
                                }
                            >
                                <Form fn={handleCreateItem} />
                            </TabContent>
                            <TabContent
                                active={
                                    tabs.showTab === 'tabEdit' ? true : false
                                }
                            >
                                <Form
                                    fn={handleUpdateItem}
                                    btn="btn-success"
                                    label="Alterar"
                                />
                            </TabContent>
                            <TabContent
                                active={
                                    tabs.showTab === 'tabDelete' ? true : false
                                }
                            >
                                <Form
                                    fn={handleDeleteItem}
                                    btn="btn-danger"
                                    label="Excluir"
                                    readOnly
                                />
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </Container>
            <Footer />
        </>
    );
};

export default BillingCycles;
