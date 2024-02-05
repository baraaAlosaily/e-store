import { client } from "../db/db.js";


export const getProducts = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('SELECT * FROM products WHERE id=$1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { product_name, product_description,price,ratings,category_id,product_img } = req.body;
        const result = await client.query('INSERT INTO products(product_name, product_description,price,ratings,category_id,product_img) VALUES($1, $2, $3 ,$4 ,$5, $6) RETURNING *', [product_name, product_description,price,ratings,category_id,product_img]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, product_description,price,ratings,category_id,product_img } = req.body;
        const result = await client.query('UPDATE products SET product_name=$1, product_description=$2 , price=$3, ratings=$4, category_id=$5 ,product_img=$6 WHERE id=$7 RETURNING *', [product_name, product_description,price,ratings,category_id,product_img,id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('DELETE FROM products WHERE id=$1', [id]);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
