import React from 'react';

const TabsHeader = (props) => {
    return (
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            {props.children}
        </ul>
    );
};

export default TabsHeader;
