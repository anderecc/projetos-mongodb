import React from 'react';
import styles from '../styles/loading.module.sass';

const Loading = () => {
    return (
        <div className={styles.container}>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;
