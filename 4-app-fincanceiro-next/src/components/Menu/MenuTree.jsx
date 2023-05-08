import React from 'react';

const MenuTree = (props) => {
    return (
        <div
            className="accordion accordion-flush text-white bg-dark"
            id="accordionFlushExample"
        >
            <div className="accordion-item text-white bg-dark">
                <h2 className="accordion-header text-white bg-dark">
                    <button
                        className="accordion-button collapsed text-white bg-dark"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                    >
                        <i className={`${props.icon} mx-2`}> </i> {props.label}
                    </button>
                </h2>
                <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse text-white bg-dark"
                    data-bs-parent="#accordionFlushExample"
                >
                    <div className="accordion-body px-4 py-2 text-white-50">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuTree;
