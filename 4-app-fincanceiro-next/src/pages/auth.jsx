import Container from '@/components/Container';
import Footer from '@/components/Footer';
import HeadPage from '@/components/Head';
import Header from '@/components/Header';
import {
    authLogin,
    authRegister,
    setModeAuth,
    setValuesAuth,
} from '@/store/actions/authActions';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Auth = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { push } = useRouter();

    return (
        <>
            <HeadPage title="Autenticação" />
            <Header />
            <Container classList="d-flex justify-content-center align-items-center text-center">
                <section>
                    {auth.mode === 'login' ? (
                        <form className="d-flex flex-column gap-5">
                            <h3 className="fs-1 ">Entre na sua conta.</h3>
                            <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                                <label className="form-label">
                                    <span>E-mail:</span>
                                </label>
                                <input
                                    value={auth.values.email}
                                    onChange={(e) =>
                                        dispatch(
                                            setValuesAuth({
                                                ...auth.values,
                                                email: e.target.value,
                                            })
                                        )
                                    }
                                    className="form-control"
                                    type="email"
                                />
                                <label className="form-label">
                                    <span>Senha:</span>
                                </label>
                                <input
                                    value={auth.values.password}
                                    onChange={(e) =>
                                        dispatch(
                                            setValuesAuth({
                                                ...auth.values,
                                                password: e.target.value,
                                            })
                                        )
                                    }
                                    className="form-control"
                                    type="password"
                                />
                                <p>
                                    Não tem uma conta?
                                    <button
                                        type="button"
                                        className="btn text-blue"
                                        onClick={() =>
                                            dispatch(setModeAuth('register'))
                                        }
                                    >
                                        Faça seu cadastro.
                                    </button>
                                </p>

                                {auth.errors?.login || auth.errors?.token ? (
                                    <p className="text-danger">
                                        {auth.errors.login || auth.errors.token}
                                    </p>
                                ) : (
                                    false
                                )}

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                        dispatch(
                                            authLogin(
                                                {
                                                    email: auth.values.email,
                                                    password:
                                                        auth.values.password,
                                                },
                                                push
                                            )
                                        )
                                    }
                                >
                                    Entrar
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form className="d-flex flex-column gap-5">
                            <h3 className="fs-1 ">Faça seu cadastro.</h3>
                            <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                                <label className="form-label">
                                    <span>Nome:</span>
                                </label>
                                <input
                                    value={auth.values.name}
                                    onChange={(e) =>
                                        dispatch(
                                            setValuesAuth({
                                                ...auth.values,
                                                name: e.target.value,
                                            })
                                        )
                                    }
                                    className="form-control"
                                    type="text"
                                />
                                <label className="form-label">
                                    <span>E-mail:</span>
                                </label>
                                <input
                                    value={auth.values.email}
                                    onChange={(e) =>
                                        dispatch(
                                            setValuesAuth({
                                                ...auth.values,
                                                email: e.target.value,
                                            })
                                        )
                                    }
                                    className="form-control"
                                    type="email"
                                />
                                <label className="form-label">
                                    <span>Senha:</span>
                                </label>
                                <input
                                    value={auth.values.password}
                                    onChange={(e) =>
                                        dispatch(
                                            setValuesAuth({
                                                ...auth.values,
                                                password: e.target.value,
                                            })
                                        )
                                    }
                                    className="form-control"
                                    type="password"
                                />
                                <label className="form-label">
                                    <span>Confirme sua senha:</span>
                                </label>
                                <input
                                    value={auth.values.confirmPassword}
                                    onChange={(e) =>
                                        dispatch(
                                            setValuesAuth({
                                                ...auth.values,
                                                confirmPassword: e.target.value,
                                            })
                                        )
                                    }
                                    className="form-control"
                                    type="password"
                                />
                                <p>
                                    Já tem uma conta?
                                    <button
                                        type="button"
                                        className="btn text-blue"
                                        onClick={() =>
                                            dispatch(setModeAuth('login'))
                                        }
                                    >
                                        Entre nela.
                                    </button>
                                </p>
                                {auth.errors?.register || auth.errors?.token ? (
                                    <p className="text-danger">
                                        {auth.errors.register ||
                                            auth.errors.token}
                                    </p>
                                ) : (
                                    false
                                )}
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                        dispatch(
                                            authRegister(
                                                { ...auth.values },
                                                push
                                            )
                                        )
                                    }
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    )}
                </section>
            </Container>
            <Footer />
        </>
    );
};

export default Auth;
