import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import './datatableproduct.css';
import ProductModal from './modalproduct';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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

    const handleEdit = (rowData) => {
        setSelectedProduct(rowData); 
        setModalVisible(true); 
    };

    const handleDelete = async (productId) => {
        const token = localStorage.getItem('token');
        const headers = {
            'token': token
        };
        try {
            await axios.delete(`http://localhost:3001/api/products/${productId}`, { headers });
            const updatedProducts = products.filter(product => product.id !== productId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error.message);
        }
    };

    const handleCloseModal = () => {
        setSelectedProduct(null); 
        setModalVisible(false); 
    };

    return (
        <div className="datatable-container">
            <DataTable value={products} className="p-datatable-custom">
                <Column field="name" header="Name" />
                <Column field="description" header="Description" />
                <Column field="price" header="Price" />
                <Column
                    body={(rowData) => (
                        <div>
                            <button className="p-button p-button-text p-button-info" onClick={() => handleEdit(rowData)}>Edit</button>
                            <button className="p-button p-button-text p-button-danger" onClick={() => handleDelete(rowData.id)}>Delete</button>
                        </div>
                    )}
                />
            </DataTable>

            <ProductModal visible={modalVisible} onHide={handleCloseModal} productId={selectedProduct?.id} />
        </div>
    );
};

export default ProductList;
