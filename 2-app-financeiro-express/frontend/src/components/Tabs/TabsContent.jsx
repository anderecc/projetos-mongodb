import React from 'react';

const TabsContent = (props) => {
    return (
        <div className="tab-content p-4" id="myTabContent">
            {props.children}
        </div>
    );
};

export default TabsContent;
