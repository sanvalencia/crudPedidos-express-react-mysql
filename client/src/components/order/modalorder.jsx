import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

const OrderModal = ({ visible, onHide }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                'token': token
            };
            try {
                const response = await axios.get('http://localhost:3001/api/products', { headers });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };

        fetchProducts();
    }, []);

    const addProductToOrder = () => {
        if (selectedProduct && quantity > 0) {
            const { id, name, description, price } = selectedProduct;
            setOrderProducts([...orderProducts, { id, name, description, price, quantity }]);
            setSelectedProduct(null);
            setQuantity(1);
        }
    };

    const handleSaveOrder = async () => {
        const token = localStorage.getItem('token');
        const personId = localStorage.getItem('personId');
        const headers = {
            'token': token
        };
        const orderData = {
            userId: personId,
            products: orderProducts.map(product => ({
                productId: product.id,
                quantity: product.quantity
            }))
        };
        try {
            await axios.post('http://localhost:3001/api/registerOrder', orderData, { headers });
            window.location.reload();
            onHide();
        } catch (error) {
            console.error('Error saving order:', error.message);
        }
    };

    return (
        <Dialog visible={visible} onHide={onHide} header="Register Order" style={{ width: '50vw' }}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="product">Product</label>
                    <Dropdown id="product" value={selectedProduct} options={products} onChange={(e) => setSelectedProduct(e.value)} optionLabel="name" placeholder="Select a product" />
                </div>
                <div className="p-field">
                    <label htmlFor="quantity">Quantity</label>
                    <InputNumber id="quantity" value={quantity} onValueChange={(e) => setQuantity(e.value)} />
                </div>
                <Button label="Add Product" style={{ width: '25%' }} icon="pi pi-plus" onClick={addProductToOrder} />
                <DataTable value={orderProducts} className="p-datatable-custom mt-3">
                    <Column field="name" header="Name" />
                    <Column field="description" header="Description" />
                    <Column field="price" header="Price" />
                    <Column field="quantity" header="Quantity" />
                </DataTable>
                <div className="p-field mt-3" style={{ width: '25%' }}>
                    <Button label="Save Order" icon="pi pi-check" onClick={handleSaveOrder} />
                </div>
            </div>
        </Dialog>
    );
};

export default OrderModal;
