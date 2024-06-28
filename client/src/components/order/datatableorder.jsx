import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import EditOrderModal from './modaledit'; // Asegúrate de importar correctamente el componente EditOrderModal

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                'token': token
            };
            try {
                const response = await axios.get('http://localhost:3001/api/orders', { headers });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error.message);
            }
        };

        fetchOrders();
    }, []);

    const handleEdit = (rowData) => {
        setSelectedOrder(rowData); 
        setEditModalVisible(true); 
    };

    const handleDelete = async (orderId) => {
        const token = localStorage.getItem('token');
        const headers = {
            'token': token
        };
        try {
            await axios.delete(`http://localhost:3001/api/orders/${orderId}`, { headers });
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error deleting order:', error.message);
        }
    };

    return (
        <div className="datatable-container">
            <DataTable value={orders} className="p-datatable-custom">
                <Column field="id" header="Order ID" />
                <Column field="total" header="Total" />
                <Column
                    body={(rowData) => (
                        <div>
                            <button className="p-button p-button-text p-button-info" onClick={() => handleEdit(rowData)}>Edit</button>
                            <button className="p-button p-button-text p-button-danger" onClick={() => handleDelete(rowData.id)}>Delete</button>
                        </div>
                    )}
                />
            </DataTable>

 
            <EditOrderModal
                visible={editModalVisible}
                onHide={() => setEditModalVisible(false)}
                order={selectedOrder} 
                updateOrder={(updatedOrder) => {
                }}
            />
        </div>
    );
};

export default OrderList;
