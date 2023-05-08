import React from 'react';

const Footer = () => {
    return (
        <footer
            className="m-0 card bg-dark text-white p-3 rounded-0 d-flex justify-content-center align-items-center"
            style={{ height: '50px' }}
        >
            <strong>
                Copyright &copy; : 2023{' '}
                <a
                    href="https://anderecc.com.br"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white-50 text-decoration-none"
                >
                    anderecc
                </a>
            </strong>
        </footer>
    );
};

export default Footer;
