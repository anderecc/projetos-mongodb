import React from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/widget/message.module.sass';

const Message = () => {
    const context = useSelector((state) => state.context);

    return (
        <div
            className={`${styles.container} ${
                context.message.visible ? styles.show : styles.hidden
            } ${
                context.message.type === 'success'
                    ? styles.success
                    : context.message.type === 'error'
                    ? styles.error
                    : ''
            }`}
        >
            <p className={`${styles.message} `}>{context.message.text}</p>
        </div>
    );
};

export default Message;
