import { bindActionCreators } from '@reduxjs/toolkit';
import { Component } from 'react';
import { connect } from 'react-redux';

import { getList, itemToEdit } from '../../store/actions/billingCyclesActions';
import { showTab, tabsVisible } from '../../store/actions/tabsActions';

class List extends Component {
    componentDidMount() {
        this.props.getList();
    }

    handleSubmit(item, tab) {
        this.props.tabsVisible(['tabList', `${tab}`]);
        this.props.showTab(`${tab}`);
        this.props.itemToEdit(item);
    }

    renderItem() {
        let list = this.props.list || [];
        return list.map((item) => {
            return (
                <tr key={item._id}>
                    <th scope="row">{item.name}</th>
                    <td>{item.month}</td>
                    <td>{item.year}</td>
                    <td>
                        <button
                            className="btn"
                            role="button"
                            onClick={() => this.handleSubmit(item, 'tabEdit')}
                        >
                            <i className="fa-solid fa-pen-to-square fs-5 text-success"></i>
                        </button>
                        <button
                            className="btn"
                            role="button"
                            onClick={() => this.handleSubmit(item, 'tabDelete')}
                        >
                            <i
                                className="fa-solid fa-trash fs-5 text-danger pointer"
                                role="button"
                            ></i>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Mês</th>
                            <th scope="col">Ano</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderItem()}</tbody>
                </table>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        list: state.billingCycles.billingCycles,
        form: state.form,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators(
            { getList, tabsVisible, showTab, itemToEdit },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
