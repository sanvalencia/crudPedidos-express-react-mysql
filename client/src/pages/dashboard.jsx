import React from 'react';
import Navbar from '../components/navbar/navbar';
import OrderCountTile from'../components/dashboard/baldosaorder'
import ProductCountTile from '../components/dashboard/baldosaproduct'
import OrdersByMonthChart from '../components/dashboard/ordermonth'

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <br/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
        <OrderCountTile/>
        <ProductCountTile/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ width: '60%'}}>
                    <OrdersByMonthChart />
            </div>
        </div>
        </div>
    );
};

export default Dashboard;