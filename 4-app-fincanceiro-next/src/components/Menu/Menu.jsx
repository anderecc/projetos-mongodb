import React from 'react';
import Item from './Item';
import MenuTree from './MenuTree';

const Menu = () => {
    return (
        <ul>
            <Item
                path={'/dashboard'}
                icon={'fa-solid fa-gauge'}
                label={'Dashboard'}
            />
            <MenuTree label="Cadastro" icon={'fa-solid fa-pen-to-square'}>
                <Item
                    path={'/billingCycles'}
                    icon={'fa-solid fa-dollar-sign'}
                    label={'Ciclos de pagamento'}
                ></Item>
            </MenuTree>
        </ul>
    );
};

export default Menu;
