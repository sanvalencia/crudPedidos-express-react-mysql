import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const ProductCountTile = () => {
    const [productCount, setProductCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductCount = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                'token': token
            };
            try {
                const response = await axios.get('http://localhost:3001/api/dashboard/countproduct', { headers });
                setProductCount(response.data.count);
            } catch (error) {
                console.error('Error fetching product count:', error.message);
            }
        };

        fetchProductCount();
    }, []);

    const handleProductRedirect = () => {
        navigate("/products");
    };

    return (
        <div className="p-col-4" style={{ width: '50%', marginLeft: '20%' }}>
            <Card className="order-count-tile" title="Products Entered">
                <div style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>{productCount}</div>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Button label="See Products" onClick={handleProductRedirect} />
                </div>
            </Card>
        </div>
    );
};

export default ProductCountTile;
