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
            <div className={styles.fixed}>
                <button
                    className={`${styles.btn_menu} ${menu ? styles.close : ''}`}
                    onClick={() => setMenu(!menu)}
                >
                    {menu ? (
                        <i className="fa-solid fa-times"></i>
                    ) : (
                        <i className="fa-solid fa-bars"></i>
                    )}
                </button>
                <ul className={styles.auth_container}>
                    {auth.userToken ? (
                        <li className={styles.signOut_container}>
                            {auth.user.id &&
                            process.env.NEXT_PUBLIC_ADMINS.includes(
                                auth.user.id
                            ) ? (
                                <Link href="/admin">Admin</Link>
                            ) : (
                                false
                            )}
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
            </div>
            <nav
                className={`${styles.nav_container} ${menu ? styles.show : ''}`}
            >
                <ul>
                    <li>
                        <Link href={'/dashboard'}>Resumo</Link>
                    </li>
                    <li>
                        <Link href={'/closing'}>Fechamento</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
