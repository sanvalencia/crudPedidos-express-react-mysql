import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css";     

import LoginPage from './pages/loginpage';
import SignupPage from './pages/signup';
import Dashboard from './pages/dashboard';
import Product from './pages/product';
import Order from './pages/order';

const App = () => {
    const token = localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={token ? <Navigate to="/index" /> : <LoginPage />} />
                <Route path="/signup" element={token ? <Navigate to="/index" /> : <SignupPage />} />
                <Route path="/index" element={token ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/products" element={token ? <Product /> : <Navigate to="/" />} />
                <Route path="/orders" element={token ? <Order /> : <Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
