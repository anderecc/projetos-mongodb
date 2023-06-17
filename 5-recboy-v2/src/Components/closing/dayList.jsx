import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

import styles from '../../styles/closing/dayList.module.sass';

import { closingCancelEditDay } from '@/store/actions/closingActions';

const DayList = ({ day, change, del, submit, edit }) => {
    const dispatch = useDispatch();
    const { push } = useRouter();

    const renderItems = () => {
        const list = day.values ?? [];
        return list.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                        <input
                            type="number"
                            value={item.value}
                            className={styles.input}
                            onChange={(e) =>
                                dispatch(
                                    change(
                                        {
                                            name: item.name,
                                            value: +e.target.value,
                                        },
                                        index
                                    )
                                )
                            }
                        />
                    </td>
                    <td>
                        <button
                            className={styles.btn_delete_value}
                            onClick={() => dispatch(del(index))}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    };

    return (
        <section className={styles.container}>
            <article className={styles.content}>
                <table className={styles.table_container}>
                    <thead>
                        <tr>
                            <th>Ponto</th>
                            <th>Total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>{renderItems()}</tbody>
                </table>
                <p className={styles.total}>
                    Total dia: R$ {day?.total?.toFixed(2)}
                </p>
            </article>
            <div className={styles.btn_container}>
                <button
                    className={styles.btn_save}
                    onClick={() => dispatch(submit(push))}
                >
                    {!edit ? 'Encerrar dia' : 'Atualizar dia'}
                </button>
                {!edit ? (
                    false
                ) : (
                    <button
                        className={styles.btn_cancel}
                        onClick={() => dispatch(closingCancelEditDay())}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </section>
    );
};

export default DayList;
