import React, { useState } from 'react';
import Link from 'next/link';

import styles from '../styles/header.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { authLogOut } from '@/store/actions/authActions';

const Header = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [menu, setMenu] = useState(false);

    const { push } = useRouter();

    return (
        <header className={styles.container}>
            <nav className={styles.nav_container}>
                <button
                    className={styles.btn_open}
                    onClick={() => setMenu(!menu)}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
                <ul
                    className={`${styles.nav_content} ${
                        menu ? styles.active : ''
                    }`}
                >
                    <li>
                        <Link href={'/dashboard'}>Resumo</Link>
                    </li>
                    <li>
                        <Link href={'/closing'}>Fechamento</Link>
                    </li>

                    <button
                        className={styles.btn_close}
                        onClick={() => setMenu(!menu)}
                    >
                        <i className="fa-solid fa-times"></i>
                    </button>
                </ul>
            </nav>
            <ul className={styles.auth_container}>
                {auth.userToken ? (
                    <li>
                        <button
                            className={styles.btn_signOut}
                            onClick={() => dispatch(authLogOut(push))}
                        >
                            <i className="fa-solid fa-user-xmark"></i>
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link href={'/auth/login'}>
                                <i className="fa-solid fa-user"></i>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/auth/register'}>
                                <i className="fa-solid fa-user-plus"></i>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

export default Header;
