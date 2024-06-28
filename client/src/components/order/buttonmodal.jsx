import React, { useState } from 'react';
import { Button } from 'primereact/button';
import OrderModal from './modalorder'; 

const OpenOrderModalButton = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleClick = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <Button label="Register Order" icon="pi pi-plus-circle" onClick={handleClick} />
            <OrderModal visible={modalVisible} onHide={handleCloseModal} />
        </div>
    );
};

export default OpenOrderModalButton;
