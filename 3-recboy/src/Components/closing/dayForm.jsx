import React from 'react';

import styles from '../../styles/closing/dayForm.module.sass';

const DayForm = (props) => {
    return (
        <form onSubmit={(e) => e.preventDefault()} className={styles.container}>
            <select
                className={styles.select}
                value={props.dayValues.name}
                onChange={(e) =>
                    props.setDayValues({
                        ...props.dayValues,
                        name: e.target.value,
                    })
                }
            >
                <option value="FAVARETTO">Favaretto</option>
                <option value="CHICKEN">Chicken</option>
                <option value="SUBWAY">Subway</option>
                <option value="DIPAOLO">Di paolo</option>
                <option value="LABRASA">La brasa</option>
                <option value="ELA">Elã</option>
                <option value="CONCEPT">Concept</option>
                <option value="SATORU">Satoru</option>
                <option value="AKIO">Akio</option>
                <option value="LABIRRA">La birra</option>
                <option value="PADOCA">Padoca</option>
                <option value="DOLCE">Dolce</option>
                <option value="LAFRUTA">La fruta</option>
                <option value="BOCAO">Bocão</option>
                <option value="STEICY">Steicy</option>
            </select>
            <input
                className={styles.input}
                type="number"
                value={props.dayValues.value}
                onChange={(e) =>
                    props.setDayValues({
                        ...props.dayValues,
                        value: +e.target.value,
                    })
                }
            />
            <button className={styles.btn_add_value} onClick={props.submit}>
                Adicionar
            </button>
        </form>
    );
};

export default DayForm;
