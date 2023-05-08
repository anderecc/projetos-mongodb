import { FaBars } from 'react-icons/fa';
import Menu from './Menu/Menu';

const Header = () => {
    return (
        <header className="main-header m-0">
            <div className="bg-dark text-white px-4 py-2">
                <button
                    className="btn btn-dark d-flex justify-content-center align-items-center p-2 fs-3"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#staticBackdrop"
                    aria-controls="staticBackdrop"
                >
                    <FaBars></FaBars>
                </button>
            </div>

            <div
                className="offcanvas offcanvas-start text-bg-dark"
                data-bs-backdrop="static"
                tabIndex="-1"
                id="staticBackdrop"
                aria-labelledby="staticBackdropLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel">
                        <a href="/" className="text-white text-decoration-none">
                            <i className="fa-solid fa-dollar-sign"></i>{' '}
                            <b>My</b> Money
                        </a>
                    </h5>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <nav>
                        <Menu />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
