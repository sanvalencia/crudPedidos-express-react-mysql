import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const OrderCountTile = () => {
    const [orderCount, setOrderCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderCount = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                'token': token
            };
            try {
                const response = await axios.get('http://localhost:3001/api/dashboard/countorder', { headers });
                setOrderCount(response.data.count);
            } catch (error) {
                console.error('Error fetching order count:', error.message);
            }
        };

        fetchOrderCount();
    }, []);

    const handleOrdersRedirect = () => {
        navigate("/orders");
    };

    return (
        <div className="p-col-4" style={{ width: '50%', marginLeft: '20%' }}>
            <Card className="order-count-tile" title="Orders Placed">
                <div style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>{orderCount}</div>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Button label="See Orders" onClick={handleOrdersRedirect} />
                </div>
            </Card>
        </div>
    );
};

export default OrderCountTile;
