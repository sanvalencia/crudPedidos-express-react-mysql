import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import axios from 'axios';

const EditOrderModal = ({ visible, onHide, order, updateOrder }) => {
    const [orderProducts, setOrderProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchOrderProducts = async () => {
            if (order && order.id) {
                const token = localStorage.getItem('token');
                const headers = {
                    'token': token
                };
                try {
                    const response = await axios.get(`http://localhost:3001/api/orders/${order.id}/products`, { headers });
                    setOrderProducts(response.data);
                    calculateTotal(response.data);
                } catch (error) {
                    console.error('Error fetching order products:', error.message);
                }
            }
        };

        fetchOrderProducts();
    }, [order]);

    const calculateTotal = (products) => {
        const newTotal = products.reduce((acc, product) => {
            return acc + (product.quantity * product.price);
        }, 0);
        setTotal(newTotal);
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            'token': token
        };
        try {
            await axios.put(`http://localhost:3001/api/orders/${order.id}`, { products: orderProducts }, { headers });
            updateOrder(order);
            onHide();
            window.location.reload();
        } catch (error) {
            console.error('Error updating order:', error.message);
        }
    };

    const handleProductQuantityChange = (productId, quantity) => {
        const updatedProducts = orderProducts.map(product => {
            if (product.productId === productId) {
                return { ...product, quantity };
            }
            return product;
        });
        setOrderProducts(updatedProducts);
        calculateTotal(updatedProducts);
    };

    return (
        <Dialog visible={visible} onHide={onHide} header="Edit Order">
            <div className="p-fluid">
                {orderProducts.map(product => (
                    <div key={product.productId} className="p-field">
                        <label>{product.name}</label>
                        <InputNumber
                            value={product.quantity}
                            onValueChange={(e) => handleProductQuantityChange(product.productId, e.value)}
                        />
                    </div>
                ))}
                <div className="p-field">
                    <Button label="Save" style={{width:'50%'}}icon="pi pi-check" onClick={handleSave} />
                </div>
            </div>
        </Dialog>
    );
};

export default EditOrderModal;
