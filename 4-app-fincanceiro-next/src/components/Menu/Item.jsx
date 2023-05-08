import React from 'react';

const Item = (props) => {
    return (
        <li>
            <a className="nav-link nav-link-hover m-2" href={props.path}>
                <i className={`${props.icon} mx-2`}></i>
                {props.label}
            </a>
        </li>
    );
};

export default Item;
