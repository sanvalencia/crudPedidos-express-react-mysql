import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './navbar.css'
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            command: () => {
                navigate('/index');
            }
        },
        {
            label: 'Products',
            icon: 'pi pi-fw pi-bookmark',
            command: () => {
                navigate('/products');
            }
        },
        {
            label: 'Orders',
            icon: 'pi pi-fw pi-box',
            command: () => {
                navigate('/orders');
            }
        }
    ];

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3001/api/logout');
            localStorage.removeItem('token');
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    const end = (
        <Button label="Logout" icon="pi pi-sign-out" className="p-button-danger" onClick={handleLogout} />
    );

    return (
        <div className="menubar-container">
            <Menubar model={items} end={end} className="custom-menubar" />
        </div>
    );
}

export default Navbar;

