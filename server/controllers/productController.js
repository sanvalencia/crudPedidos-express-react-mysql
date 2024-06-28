import {connection} from '../db.js';

export const createProduct = async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const [result] = await connection.query('INSERT INTO products (name, description, price) VALUES (?, ?, ?)', [name, description, price]);
        res.status(201).json({ id: result.insertId, name, description, price });
    } catch (err) {
        res.status(500).send('Error al crear el producto');
    }
};

export const getProducts = async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM products');
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send('Error al obtener los productos');
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.status(200).json(results[0]);
    } catch (err) {
        res.status(500).send('Error al obtener el producto');
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
        const [result] = await connection.query('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.status(200).send('Producto actualizado');
    } catch (err) {
        res.status(500).send('Error al actualizar el producto');
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await connection.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.status(200).send('Producto eliminado');
    } catch (err) {
        res.status(500).send('Error al eliminar el producto');
    }
};
