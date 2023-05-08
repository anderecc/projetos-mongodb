import { useDispatch, useSelector } from 'react-redux';
import {
    addNewCredit,
    addNewDebit,
    setNewCredit,
    setNewDebit,
    setValues,
} from '../../store/actions/formActions';
import { cancel } from '../../store/actions/billingCyclesActions';
import firstLetterUpperCase from '../../functions/firstLetterUpperCase';

import ValuesList from './ValuesList';
import Summary from './Summary';

const Form = (props) => {
    let form = useSelector((state) => state.form);
    let billingCycles = useSelector((state) => state.billingCycles);
    let dispatch = useDispatch();

    let renderErrors = () => {
        let errors = billingCycles.messages.error || [];
        return errors.map((error, index) => {
            return (
                <p className="text-red" key={index}>
                    {error}
                </p>
            );
        });
    };

    let computeValues = (values) => {
        let value = 0;
        values.map((item) => (value += item.value));
        return value;
    };

    return (
        <form
            className="row g-3 needs-validation"
            noValidate
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">
                    Nome
                </label>
                <input
                    readOnly={props.readOnly}
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    value={form.values.name}
                    required
                    onChange={(e) =>
                        dispatch(
                            setValues({
                                ...form.values,
                                name: firstLetterUpperCase(e.target.value),
                            })
                        )
                    }
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="validationCustom02" className="form-label">
                    Mês
                </label>
                <input
                    readOnly={props.readOnly}
                    type="number"
                    className="form-control"
                    id="validationCustom02"
                    value={form.values.month}
                    required
                    onChange={(e) =>
                        dispatch(
                            setValues({
                                ...form.values,
                                month: e.target.value,
                            })
                        )
                    }
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="validationCustom02" className="form-label">
                    Ano
                </label>
                <input
                    readOnly={props.readOnly}
                    type="number"
                    className="form-control"
                    id="validationCustom02"
                    value={form.values.year}
                    required
                    onChange={(e) =>
                        dispatch(
                            setValues({ ...form.values, year: e.target.value })
                        )
                    }
                />
            </div>
            <Summary
                credit={computeValues(form.values.credits)}
                debit={computeValues(form.values.debits)}
            />
            <ValuesList
                cols="12 6"
                values={form.values.credits}
                label="Créditos"
                credits
                form={form}
                change={setNewCredit}
                submit={addNewCredit}
            />
            <ValuesList
                cols="12 6"
                values={form.values.debits}
                label="Débitos"
                debits
                form={form}
                change={setNewDebit}
                submit={addNewDebit}
            />

            {renderErrors()}

            <p className="text-green">{billingCycles.messages.success || ''}</p>
            <div className="col-12">
                <button
                    className="btn btn-secondary mr-4"
                    onClick={() => dispatch(cancel())}
                >
                    Cancelar
                </button>
                <button
                    className={`btn ${props.btn ? props.btn : 'btn-primary'}`}
                    onClick={() => props.fn({ ...form.values })}
                >
                    {props.label ? props.label : 'Adicionar'}
                </button>
            </div>
        </form>
    );
};

export default Form;
