import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../styles/auth/form.module.sass';

import verifyValue from '@/functions/verifyValue';
import {
    authLogin,
    authRegister,
    authSetErrors,
    authSetValues,
} from '@/store/actions/authActions';
import Link from 'next/link';
import { setCookie } from 'cookies-next';

const Form = (props) => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);

    const handleChange = (type, e) => {
        let nameVerified;
        let emailVerified;
        let passwordVerified;
        let passwordConfirmVerified;
        if (e) {
            nameVerified = verifyValue(type, e.target.value);
            emailVerified = verifyValue(type, e.target.value);
            passwordVerified = verifyValue(type, e.target.value);
            passwordConfirmVerified = verifyValue(
                type,
                auth.values.password,
                e.target.value
            );
        }

        switch (type) {
            case 'name':
                if (nameVerified) {
                    dispatch(
                        authSetValues({ ...auth.values, name: e.target.value })
                    );
                    return dispatch(
                        authSetErrors({ ...auth.errors, name: '' })
                    );
                } else {
                    dispatch(authSetValues({ ...auth.values, name: '' }));
                    return dispatch(
                        authSetErrors({
                            ...auth.errors,
                            name: 'Informe seu nome.',
                        })
                    );
                }
            case 'email':
                if (emailVerified) {
                    dispatch(
                        authSetValues({ ...auth.values, email: e.target.value })
                    );
                    return dispatch(
                        authSetErrors({ ...auth.errors, email: '' })
                    );
                } else {
                    dispatch(
                        authSetValues({ ...auth.values, email: e.target.value })
                    );
                    return dispatch(
                        authSetErrors({
                            ...auth.errors,
                            email: 'Informe um e-mail válido.',
                        })
                    );
                }

            case 'password':
                if (passwordVerified) {
                    dispatch(
                        authSetValues({
                            ...auth.values,
                            password: e.target.value,
                        })
                    );
                    return dispatch(
                        authSetErrors({ ...auth.errors, password: '' })
                    );
                } else {
                    dispatch(
                        authSetValues({
                            ...auth.values,
                            password: e.target.value,
                        })
                    );
                    return dispatch(
                        authSetErrors({
                            ...auth.errors,
                            password:
                                'Sua senha deve conter entre 6 a 12 caracteres, letras e numeros.',
                        })
                    );
                }

            case 'confirmPassword':
                if (passwordConfirmVerified) {
                    dispatch(
                        authSetValues({
                            ...auth.values,
                            confirmPassword: e.target.value,
                        })
                    );
                    return dispatch(
                        authSetErrors({ ...auth.errors, confirmPassword: '' })
                    );
                } else {
                    dispatch(
                        authSetValues({
                            ...auth.values,
                            confirmPassword: e.target.value,
                        })
                    );
                    return dispatch(
                        authSetErrors({
                            ...auth.errors,
                            confirmPassword: 'As senhas não conferem.',
                        })
                    );
                }

            case 'submitLogin':
                if (
                    verifyValue('email', auth.values.email) &&
                    verifyValue('password', auth.values.password)
                ) {
                    setDisabled(true);
                    dispatch(
                        authSetErrors({
                            ...auth.errors,
                            submitLogin: '',
                        })
                    );
                    return dispatch(
                        authLogin(
                            {
                                email: auth.values.email,
                                password: auth.values.password,
                            },
                            setCookie
                        )
                    );
                } else {
                    dispatch(
                        authSetErrors({
                            ...auth.errors,
                            submitLogin:
                                'Preencha corretamente todos os campos.',
                        })
                    );
                    setDisabled(false);
                    return false;
                }

            case 'submitRegister':
                if (
                    verifyValue('name', auth.values.name) &&
                    verifyValue('email', auth.values.email) &&
                    verifyValue('password', auth.values.password) &&
                    verifyValue(
                        'confirmPassword',
                        auth.values.password,
                        auth.values.confirmPassword
                    )
                ) {
                    setDisabled(true);
                    dispatch(
                        authSetErrors({
                            ...auth.errors,
                            submitRegister: '',
                        })
                    );
                    return dispatch(
                        authRegister(
                            {
                                name: auth.values.name,
                                email: auth.values.email,
                                password: auth.values.password,
                                confirmPassword: auth.values.confirmPassword,
                            },
                            setCookie
                        )
                    );
                } else {
                    setDisabled(false);
                    dispatch(
                        authSetErrors({
                            ...auth.errors,
                            submitRegister:
                                'Preencha corretamente todos os campos.',
                        })
                    );
                    return false;
                }

            default:
                break;
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className={styles.container}>
            <h2 className={styles.title}>
                {props.register ? 'Faça seu cadastro' : 'Entre na sua conta'}
            </h2>

            {props.register ? (
                <>
                    <div className={styles.input_container}>
                        <label htmlFor="authName">Nome: </label>
                        <input
                            type="text"
                            id="authName"
                            value={auth.values.name}
                            onChange={(e) => handleChange('name', e)}
                        />
                        <p className="text-warning">{auth.errors?.name}</p>
                    </div>
                </>
            ) : (
                false
            )}
            <div className={styles.input_container}>
                <label htmlFor="authEmail">E-mail: </label>
                <input
                    type="email"
                    id="authEmail"
                    value={auth.values.email}
                    onChange={(e) => handleChange('email', e)}
                />
                <p className="text-warning">{auth.errors?.email}</p>
            </div>
            <div className={styles.input_container}>
                <label htmlFor="authPassword">Senha: </label>
                <input
                    type="password"
                    id="authPassword"
                    value={auth.values.password}
                    onChange={(e) => handleChange('password', e)}
                />
                <p className="text-warning">{auth.errors?.password}</p>
            </div>
            {props.register ? (
                <>
                    <div className={styles.input_container}>
                        <label htmlFor="authConfirmPassword">
                            Confirmar senha:
                        </label>
                        <input
                            type="password"
                            id="authConfirmPassword"
                            value={auth.values.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e)}
                        />
                        <p className="text-warning">
                            {auth.errors?.confirmPassword}
                        </p>
                    </div>
                </>
            ) : (
                false
            )}
            <p className="text-warning">
                {props.register
                    ? auth.errors?.submitRegister
                    : auth.errors?.submitLogin}
            </p>
            <button
                onClick={() =>
                    handleChange(
                        props.register ? 'submitRegister' : 'submitLogin'
                    )
                }
                disabled={disabled}
                className={styles.btn_submit}
            >
                {props.register ? 'Registrar' : 'Entrar'}
            </button>
            {props.register ? (
                <p className={styles.link}>
                    Já tem uma conta?
                    <Link href={'/auth/login'}> Entre nela.</Link>
                </p>
            ) : (
                <p className={styles.link}>
                    Não tem uma conta?
                    <Link href={'/auth/register'}> Cadastre a sua.</Link>
                </p>
            )}
        </form>
    );
};

export default Form;
