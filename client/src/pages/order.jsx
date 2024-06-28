import React from 'react';
import Navbar from '../components/navbar/navbar';
import OpenOrderModalButton from '../components/order/buttonmodal';
import OrderList from '../components/order/datatableorder';

const Order = () => {
    return (
        <div>
            <Navbar />
            <h1>ORDERS</h1>
            <OpenOrderModalButton/>
            <br/>
            <OrderList/>
        </div>
    );
};

export default Order;