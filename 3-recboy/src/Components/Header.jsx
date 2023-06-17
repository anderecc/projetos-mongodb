/* eslint-disable no-undef */
import React, { useState } from 'react';
import Link from 'next/link';

import styles from '../styles/header.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { authLogOut } from '@/store/actions/authActions';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const Header = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [menu, setMenu] = useState(false);

    const { push } = useRouter();

    const handleLogOut = () => {
        dispatch(authLogOut(push));
        return deleteCookie('user-token');
    };

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
                    {auth.user.id &&
                    process.env.NEXT_PUBLIC_ADMINS.includes(auth.user.id) ? (
                        <li>
                            <Link href="/admin">Admin</Link>
                        </li>
                    ) : (
                        false
                    )}

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
                            onClick={() => handleLogOut()}
                        >
                            Sair
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link href={'/auth/login'}>Entrar</Link>
                        </li>
                        <li>
                            <Link href={'/auth/register'}>Cadastrar</Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

export default Header;
