import React from 'react';

const Container = (props) => {
    return (
        <main
            className={`px-2 px-sm-5 py-2 ${props.classList}`}
            style={{ minHeight: 'calc(100vh - 100px)' }}
        >
            {props.children}
        </main>
    );
};

export default Container;
