import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import axios from 'axios';
import './formproduct.css';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setNameError('Name is required');
            return;
        } else {
            setNameError('');
        }

        if (price <= 0) {
            setPriceError('Price must be greater than 0');
            return;
        } else {
            setPriceError('');
        }

        const formattedPrice = parseFloat(price.toString().replace(/,/g, '')); 

        const token = localStorage.getItem('token');
        const headers = {
            'token': token
        };
        
        try {
            const response = await axios.post('http://localhost:3001/api/registerProduct', {
                name,
                description,
                price: formattedPrice 
            }, { headers });
            window.location.reload();
        } catch (error) {
            console.error('Product registration failed:', error.message);
            setError('Error registering product');
        }
    };

    return (
        <div className="product-form-container">
            <form onSubmit={handleSubmit} className="product-form">
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    {nameError && <small className="p-error">{nameError}</small>}

                    <label htmlFor="description">Description</label>
                    <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <label htmlFor="price">Price</label>
                    <InputNumber 
                        id="price" 
                        value={price} 
                        onValueChange={(e) => setPrice(e.value)} 
                        mode="currency" 
                        currency="COP" 
                        locale="es-CO" 
                        useGrouping={true}
                    />
                    {priceError && <small className="p-error">{priceError}</small>}
                </div>
                {error && <div className="p-error">{error}</div>}
                <br/>
                <Button type="submit" label="Register" />
            </form>
        </div>
    );
};

export default ProductForm;
