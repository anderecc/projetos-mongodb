import React from 'react';
import styles from '../styles/footer.module.sass';
import Link from 'next/link';

const Footer = (props) => {
    return (
        <footer
            className={`${styles.container} ${
                props.loading ? styles.loading : ''
            }`}
        >
            <p>
                Copyright &copy; 2023, by:{' '}
                <Link href="https://anderecc.com.br" target="_blank">
                    anderecc
                </Link>
            </p>
        </footer>
    );
};

export default Footer;
