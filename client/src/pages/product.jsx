import React from 'react';
import Navbar from '../components/navbar/navbar';
import ProductForm from '../components/product/formproduct';
import ProductList from '../components/product/datatableproduct';

const Product = () => {
    return (
        <div>
            <Navbar />
            <h1>PRODUCTS</h1> 
            <ProductForm />
            <br/>
            <ProductList/>

        </div>
    );
};

export default Product;