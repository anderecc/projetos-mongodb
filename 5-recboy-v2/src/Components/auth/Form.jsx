import React, { useState } from 'react';
import styles from '../../styles/auth/form.module.sass';
import { useDispatch } from 'react-redux';
import { authLogin, authRegister } from '@/store/actions/authActions';
import { setCookie } from 'cookies-next';
import { contextSetMessage } from '@/store/actions/contextActions';

const Form = (props) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.email.match(emailRegex)) {
            if (!props.login) {
                return dispatch(authRegister({ ...user }, setCookie));
            } else {
                return dispatch(authLogin({ ...user }, setCookie));
            }
        } else {
            return dispatch(
                contextSetMessage({
                    text: 'Informe um email válido.',
                    type: 'error',
                    visible: true,
                })
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            {props.login ? (
                false
            ) : (
                <label className={styles.user_name}>
                    <span>Nome</span>
                    <input
                        type="text"
                        required
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value.trim() })
                        }
                    />
                </label>
            )}
            <label className={styles.user_email}>
                <span>Email</span>
                <input
                    type="email"
                    required
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value.trim() })
                    }
                />
            </label>
            <label className={styles.user_password}>
                <span>Senha</span>
                <input
                    type="password"
                    required
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value.trim() })
                    }
                />
            </label>
            {props.login ? (
                false
            ) : (
                <label className={styles.user_confirm_password}>
                    <span>Confirme sua senha</span>
                    <input
                        type="password"
                        required
                        value={user.confirmPassword}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                confirmPassword: e.target.value.trim(),
                            })
                        }
                    />
                </label>
            )}
            <input
                type="submit"
                value={props.login ? 'Entrar' : 'Cadastrar'}
                className={styles.btn_submit}
            />
        </form>
    );
};

export default Form;
