import React from 'react';

const Container = (props) => {
    return (
        <main className={`px-5 py-2 ${props.classList}`}>{props.children}</main>
    );
};

export default Container;
