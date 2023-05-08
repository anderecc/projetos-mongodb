import { useDispatch } from 'react-redux';
import { useState } from 'react';

import firstLetterUpperCase from '../../functions/firstLetterUpperCase';
import { setValues } from '../../store/actions/formActions';

import Grid from './Grid';

const ValuesList = (props) => {
    let dispatch = useDispatch();
    let [readOnly, setReadOnly] = useState(true);

    let renderRows = () => {
        let values = props.values;
        return values.length > 0
            ? values.map((item, index) => {
                  return (
                      <tr key={index}>
                          <td>
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Nome"
                                  value={item.name}
                                  readOnly={readOnly}
                                  onChange={(e) =>
                                      handleEditValue('editName', e, index)
                                  }
                              />
                          </td>
                          <td>
                              <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Valor"
                                  value={item.value}
                                  readOnly={readOnly}
                                  onChange={(e) =>
                                      handleEditValue('editValue', e, index)
                                  }
                              />
                          </td>
                          {props.debits ? (
                              <td>
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Status"
                                      value={item.status}
                                      readOnly={readOnly}
                                      onChange={(e) =>
                                          handleEditValue(
                                              'editStatus',
                                              e,
                                              index
                                          )
                                      }
                                  />
                              </td>
                          ) : (
                              false
                          )}
                          <td className="d-flex flex-col gap-1">
                              <button
                                  className="btn btn-success"
                                  type="button"
                                  onClick={() => setReadOnly(!readOnly)}
                              >
                                  <i className="fa-solid fa-pencil"></i>
                              </button>
                              <button
                                  className="btn btn-warning"
                                  type="button"
                                  onClick={() => handleDuplicateItem(item)}
                              >
                                  <i className="fa-solid fa-copy"></i>
                              </button>
                              <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={() => handleDeleteItem(index)}
                              >
                                  <i className="fa-solid fa-trash"></i>
                              </button>
                          </td>
                      </tr>
                  );
              })
            : false;
    };

    let handleChange = (type, e) => {
        if (props.debits) {
            type === 'name'
                ? dispatch(
                      props.change({
                          ...props.form.newDebit,
                          name: firstLetterUpperCase(e.target.value),
                      })
                  )
                : type === 'value'
                ? dispatch(
                      props.change({
                          ...props.form.newDebit,
                          value: +e.target.value,
                      })
                  )
                : type === 'status'
                ? dispatch(
                      props.change({
                          ...props.form.newDebit,
                          status: firstLetterUpperCase(
                              e.target.value
                          ).toUpperCase(),
                      })
                  )
                : false;
        } else if (props.credits) {
            type === 'name'
                ? dispatch(
                      props.change({
                          ...props.form.newCredit,
                          name: firstLetterUpperCase(e.target.value),
                      })
                  )
                : type === 'value'
                ? dispatch(
                      props.change({
                          ...props.form.newCredit,
                          value: +e.target.value,
                      })
                  )
                : false;
        }
    };

    let handleEditValue = (type, e, index) => {
        let credits = [...props.form.values.credits];
        let debits = [...props.form.values.debits];
        if (props.debits) {
            switch (type) {
                case 'editName':
                    debits[index] = {
                        ...debits[index],
                        name: firstLetterUpperCase(e.target.value),
                    };
                    return dispatch(
                        setValues({ ...props.form.values, debits })
                    );
                case 'editValue':
                    debits[index] = {
                        ...debits[index],
                        value: +e.target.value,
                    };
                    return dispatch(
                        setValues({ ...props.form.values, debits })
                    );
                case 'editStatus':
                    debits[index] = {
                        ...debits[index],
                        status: firstLetterUpperCase(
                            e.target.value
                        ).toUpperCase(),
                    };
                    return dispatch(
                        setValues({ ...props.form.values, debits })
                    );

                default:
                    break;
            }
        } else if (props.credits) {
            switch (type) {
                case 'editName':
                    credits[index] = {
                        ...credits[index],
                        name: firstLetterUpperCase(e.target.value),
                    };
                    return dispatch(
                        setValues({ ...props.form.values, credits })
                    );
                case 'editValue':
                    credits[index] = {
                        ...credits[index],
                        value: +e.target.value,
                    };
                    return dispatch(
                        setValues({ ...props.form.values, credits })
                    );
                default:
                    break;
            }
        }
    };

    let handleDeleteItem = (index) => {
        let credits = [...props.form.values.credits];
        let debits = [...props.form.values.debits];
        if (props.debits) {
            debits.splice(index, 1);
            return dispatch(setValues({ ...props.form.values, debits }));
        } else if (props.credits) {
            credits.splice(index, 1);
            return dispatch(setValues({ ...props.form.values, credits }));
        }
    };

    let handleDuplicateItem = (item) => {
        let credits = [...props.form.values.credits];
        let debits = [...props.form.values.debits];

        if (props.debits) {
            debits.push({ ...item });
            return dispatch(setValues({ ...props.form.values, debits }));
        } else if (props.credits) {
            credits.push({ ...item });
            return dispatch(setValues({ ...props.form.values, credits }));
        }
    };

    let handleSubmit = (type) => {
        switch (type) {
            case 'add':
                setReadOnly(true);
                return dispatch(props.submit());
            case 'clear':
                if (props.debits) {
                    return dispatch(
                        props.change({ name: '', value: 0, status: 'PAGO' })
                    );
                } else if (props.credits) {
                    return dispatch(props.change({ name: '', value: 0 }));
                }
                break;

            default:
                break;
        }
    };

    return (
        <Grid cols={props.cols}>
            <fieldset>
                <legend>{props.label}</legend>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                            {props.debits ? <th>Status</th> : false}
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome"
                                    value={
                                        props.debits
                                            ? props.form.newDebit.name
                                            : props.form.newCredit.name
                                    }
                                    onChange={(e) => handleChange('name', e)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Valor"
                                    value={
                                        props.debits
                                            ? props.form.newDebit.value
                                            : props.form.newCredit.value
                                    }
                                    onChange={(e) => handleChange('value', e)}
                                />
                            </td>
                            {props.debits ? (
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Status"
                                        value={props.form.newDebit.status}
                                        onChange={(e) =>
                                            handleChange('status', e)
                                        }
                                    />
                                </td>
                            ) : (
                                false
                            )}
                            <td className="d-flex flex-col gap-1">
                                <button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={() => handleSubmit('add')}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                                <button
                                    className="btn btn-warning"
                                    type="button"
                                >
                                    <i className="fa-solid fa-copy"></i>
                                </button>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => handleSubmit('clear')}
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            </td>
                        </tr>
                        {renderRows()}
                    </tbody>
                </table>
            </fieldset>
        </Grid>
    );
};

export default ValuesList;
