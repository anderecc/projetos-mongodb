import { authSignOut } from '@/store/actions/authActions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { push } = useRouter();

    return (
        <header>
            <nav
                className=" bg-dark justify-content-between px-5 d-flex align-items-center"
                data-bs-theme="dark"
                style={{ minHeight: '50px' }}
            >
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Link href="/dashboard" className="nav-link fs-5 ">
                        Dashboard
                    </Link>
                    <Link href="billingCycles" className="nav-link fs-5 ">
                        Ciclos de pagamento
                    </Link>
                    {/* <button onClick={() => console.log(auth, bill)}>log</button> */}
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    {auth.userToken ? (
                        <>
                            <p className="m-0">{auth.user.name}</p>
                            <button
                                onClick={() => dispatch(authSignOut(push))}
                                style={{
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                }}
                            >
                                <i className="fa-solid fa-user-xmark"></i>
                            </button>
                        </>
                    ) : (
                        <Link href={'/auth'}>
                            <i className="fa-solid fa-user-plus fs-5"></i>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
