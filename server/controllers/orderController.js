import {connection} from '../db.js';

export const createOrder = async (req, res) => {
    const { userId } = req;
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).send('La lista de productos es requerida y no puede estar vacía');
    }

    try {
        let total = 0;
        for (const product of products) {
            const [productResult] = await connection.query('SELECT price FROM products WHERE id = ?', [product.productId]);
            if (productResult.length === 0) {
                return res.status(404).send(`Producto con ID ${product.productId} no encontrado`);
            }
            total += productResult[0].price * product.quantity;
        }

        const [orderResult] = await connection.query('INSERT INTO orders (user_id, total) VALUES (?, ?)', [userId, total]);
        const orderId = orderResult.insertId;

        const details = products.map(p => [orderId, p.productId, p.quantity]);
        const detailsQuery = 'INSERT INTO detailorders (order_id, product_id, quantity) VALUES ?';
        await connection.query(detailsQuery, [details]);

        res.status(201).json({ orderId, userId, products, total });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al crear la orden');
    }
};

export const getOrders = async (req, res) => {
    const { userId } = req;

    try {
        const [orders] = await connection.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
        const [details] = await connection.query('SELECT * FROM detailorders WHERE order_id IN (?)', [orders.map(o => o.id)]);

        const ordersWithDetails = orders.map(order => ({
            ...order,
            details: details.filter(detail => detail.order_id === order.id)
        }));

        res.status(200).json(ordersWithDetails);
    } catch (err) {
        res.status(500).send('Error al obtener las órdenes');
    }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;

    try {
        const [orders] = await connection.query('SELECT * FROM orders WHERE id = ? AND user_id = ?', [id, userId]);
        if (orders.length === 0) {
            return res.status(404).send('Orden no encontrada');
        }

        const [details] = await connection.query('SELECT * FROM detailorders WHERE order_id = ?', [id]);

        const orderWithDetails = {
            ...orders[0],
            details
        };

        res.status(200).json(orderWithDetails);
    } catch (err) {
        res.status(500).send('Error al obtener la orden');
    }
};

export const updateOrder = async (req, res) => {
    const id = req.params.id;
    const { userId } = req; 
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).send('La lista de productos es requerida y no puede estar vacía');
    }

    try {
        const [orderCheck] = await connection.query('SELECT * FROM orders WHERE id = ? AND user_id = ?', [id, userId]);
        if (orderCheck.length === 0) {
            return res.status(404).send('Orden no encontrada');
        }

        let total = 0;
        for (const product of products) {
  
            const [productResult] = await connection.query('SELECT price FROM products WHERE id = ?', [product.productId]);
            if (productResult.length === 0) {
                return res.status(404).send(`Producto con ID ${product.productId} no encontrado`);
            }

            total += productResult[0].price * product.quantity;

 
            const [existingDetail] = await connection.query('SELECT * FROM detailorders WHERE order_id = ? AND product_id = ?', [id, product.productId]);

            if (existingDetail.length > 0) {

                await connection.query('UPDATE detailorders SET quantity = ? WHERE order_id = ? AND product_id = ?', [product.quantity, id, product.productId]);
            } else {

                await connection.query('INSERT INTO detailorders (order_id, product_id, quantity) VALUES (?, ?, ?)', [id, product.productId, product.quantity]);
            }
        }

        await connection.query('UPDATE orders SET total = ? WHERE id = ?', [total, id]);
        res.status(200).json({ orderId: id, userId, products, total });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar la orden');
    }
};


export const deleteOrder = async (req, res) => {
    const orderId = req.params.id;

    try {
        await connection.query('DELETE FROM detailorders WHERE order_id = ?', [orderId]);
        const [result] = await connection.query('DELETE FROM orders WHERE id = ?', [orderId]);

        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).send(`Order with ID ${orderId} not found`);
        }
    } catch (error) {
        console.error('Error deleting order:', error.message);
        res.status(500).send('Error deleting order');
    }
};

export const getOrderProducts = async (req, res) => {
    const orderId  = req.params.id; 
    try {

        const [products] = await connection.query('SELECT p.id AS productId, p.name, do.quantity FROM detailorders do INNER JOIN products p ON do.product_id = p.id WHERE do.order_id = ?', [orderId]);

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching order products:', error);
        res.status(500).send('Error fetching order products');
    }
};


