import React from 'react';

const ContentHeader = (props) => {
    return (
        <section>
            <h1 className="fw-medium fs-3">
                {props.title}{' '}
                <small className="text-secondary fw-normal fs-6">
                    {props.small}
                </small>
            </h1>
        </section>
    );
};

export default ContentHeader;
