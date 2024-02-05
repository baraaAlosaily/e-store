import { client } from "../db/db.js";


export const getCategories = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM category');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('SELECT * FROM category WHERE id=$1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createCategory = async (req, res) => {
    try {
        const { category, parent_category_id } = req.body;
        const result = await client.query('INSERT INTO category(category, parent_category_id) VALUES($1, $2) RETURNING *', [category, parent_category_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, parent_category_id } = req.body;
        const result = await client.query('UPDATE category SET category=$1, parent_category_id=$2 WHERE id=$7 RETURNING *', [category, parent_category_id,id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('DELETE FROM category WHERE id=$1', [id]);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
