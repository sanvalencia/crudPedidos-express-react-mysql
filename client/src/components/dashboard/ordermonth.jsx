import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrdersByMonthChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchOrdersByMonth = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                'token': token
            };
            try {
                const response = await axios.get('http://localhost:3001/api/dashboard/ordermonth', { headers });
                const data = response.data;
                console.log(data);

                if (data && Array.isArray(data) && data.length > 0) {
                    const months = data.map(entry => entry.month);
                    const orders = data.map(entry => entry.count);

                    setChartData({
                        labels: months,
                        datasets: [
                            {
                                label: 'Orders per Month',
                                data: orders,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgb(75, 192, 192)',
                                borderWidth: 1
                            }
                        ]
                    });
                } else {
                    console.log('No se recibieron datos válidos desde el servidor');
                }
            } catch (error) {
                console.error('Error al obtener pedidos por mes:', error.message);
            }
        };

        fetchOrdersByMonth();
    }, []);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <div>
            <h2>Orders per Month</h2>
            {chartData.labels && chartData.labels.length > 0 ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>No hay datos disponibles para mostrar.</p>
            )}
        </div>
    );
};

export default OrdersByMonthChart;
