import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import axios from 'axios';

const ProductModal = ({ visible, onHide, productId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');

    useEffect(() => {
        const fetchProductById = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                'token': token
            };
            try {
                const response = await axios.get(`http://localhost:3001/api/products/${productId}`, { headers });
                const { name, description, price } = response.data;
                setName(name);
                setDescription(description);
                setPrice(price);
            } catch (error) {
                console.error('Error fetching product:', error.message);
            }
        };

        if (visible && productId) {
            fetchProductById();
        }
    }, [visible, productId]);

    const handleSave = async () => {
        let valid = true;

        if (!name) {
            setNameError('Name is required');
            valid = false;
        } else {
            setNameError('');
        }

        if (price <= 0) {
            setPriceError('Price must be greater than 0');
            valid = false;
        } else {
            setPriceError('');
        }

        if (!valid) {
            return;
        }

        const token = localStorage.getItem('token');
        const headers = {
            'token': token
        };
        try {
            await axios.put(`http://localhost:3001/api/products/${productId}`, {
                name,
                description,
                price
            }, { headers });
            window.location.reload();
            onHide();
        } catch (error) {
            console.error('Error updating product:', error.message);
        }
    };

    return (
        <Dialog visible={visible} onHide={onHide} header="Edit Product">
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    {nameError && <small className="p-error">{nameError}</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
                </div>
                <div className="p-field">
                    <label htmlFor="price">Price</label>
                    <InputNumber id="price" value={price} onValueChange={(e) => setPrice(e.value)} mode="currency" currency="USD" />
                    {priceError && <small className="p-error">{priceError}</small>}
                </div>
                <div className="p-field">
                    <Button label="Save" icon="pi pi-check" style={{ width: '40%' }} onClick={handleSave} />
                </div>
            </div>
        </Dialog>
    );
};

export default ProductModal;
