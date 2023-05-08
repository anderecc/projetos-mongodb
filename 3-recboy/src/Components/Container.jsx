import React from 'react';
import styles from '../styles/container.module.sass';

const Container = (props) => {
    return (
        <main
            className={`${styles.container} ${
                props.auth
                    ? styles.auth
                    : props.dashboard
                    ? styles.dashboard
                    : props.closing
                    ? styles.closing
                    : props.home
                    ? styles.home
                    : ''
            }`}
        >
            {props.children}
        </main>
    );
};

export default Container;
