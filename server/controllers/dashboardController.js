import { connection } from "../db.js";

export const getOrderCountByUser = async (req, res) => {
    const { userId } = req;
    try {
        const [result] = await connection.query('SELECT COUNT(*) AS orderCount FROM orders WHERE user_id = ?', [userId]);
        const orderCount = result[0].orderCount;
        res.status(200).json({ count: orderCount });
    } catch (error) {
        console.error('Error fetching order count:', error);
        res.status(500).send('Error fetching order count');
    }
};

export const getProductsCount = async (req, res) => {
    try {
        const [result] = await connection.query('SELECT COUNT(*) AS productCount FROM products');
        const productCount = result[0].productCount;
        res.status(200).json({ count: productCount });
    } catch (error) {
        console.error('Error fetching product count:', error);
        res.status(500).send('Error fetching product count');
    }
};

export const getOrderMonth = async (req, res) => {
    const { userId } = req;
    try {
        const query = `
            SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, COUNT(*) AS count
            FROM orders
            WHERE user_id = ?
            GROUP BY DATE_FORMAT(order_date, '%Y-%m')
            ORDER BY DATE_FORMAT(order_date, '%Y-%m') ASC
        `;
        const [results] = await connection.query(query, [userId]);
        res.json(results);
    } catch (error) {
        console.error('Error fetching monthly orders:', error);
        res.status(500).send('Error fetching monthly orders');
    }
};

