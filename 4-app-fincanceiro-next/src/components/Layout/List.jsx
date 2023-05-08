import { useDispatch, useSelector } from 'react-redux';
import { getList, itemToEdit } from '../../store/actions/billingCyclesActions';
import { showTab, tabsVisible } from '../../store/actions/tabsActions';
import { useEffect } from 'react';

let List = () => {
    const billingCycles = useSelector((state) => state.billingCycles);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getList(auth.userToken));
    }, [auth.userToken]);

    let handleSubmit = (item, tab) => {
        dispatch(tabsVisible(['tabList', `${tab}`]));
        dispatch(showTab(`${tab}`));
        dispatch(itemToEdit(item));
    };

    let renderItem = () => {
        let list = billingCycles.billingCycles || [];
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
                            onClick={() => handleSubmit(item, 'tabEdit')}
                        >
                            <i className="fa-solid fa-pen-to-square fs-5 text-success"></i>
                        </button>
                        <button
                            className="btn"
                            role="button"
                            onClick={() => handleSubmit(item, 'tabDelete')}
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
    };

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
                <tbody>{renderItem()}</tbody>
            </table>
        </div>
    );
};

export default List;
