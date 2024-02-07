import { client } from "../db/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const getUsers = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users');
        if(result.rows.length===0) throw new Error('No users found');
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('SELECT * FROM users WHERE user_id=$1', [id]);
        if(result.rows.length===0) throw new Error('No users found');
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'User not found' });
    }
}

const createUser = async (user) => {
    const { username, password, email, role_id } = user;

    if(!username || !password || !email ) throw new Error('Missing fields');

    if(!passwordRegex.test(password)) throw new Error('Password must contain at least one uppercase letter, one lowercase letter and one number');
    if(password.length<8) throw new Error('Password must be at least 8 characters long');
    if(username.length<3) throw new Error('Username must be at least 3 characters long');
    if(!emailRegex.test(email)) throw new Error('Invalid email');

    const userDuplication = await client.query('SELECT * FROM users WHERE username=$1', [username]);

    if(userDuplication.rows.length>0) throw new Error('Username already exists');

    const userEmail = await client.query('SELECT * FROM users WHERE email=$1', [email]);

    if(userEmail.rows.length>0) throw new Error('Email already exists');

    const password_hash=bcrypt.hashSync(password, 10);

    const result = await client.query('INSERT INTO users(username, password_hash, email, role_id) VALUES($1, $2, $3, $4) RETURNING *', [username, password_hash, email, role_id||3]);

    return result.rows[0];
}

export const registerUser = async (req, res) => {
    try {
        const user = req.body;
        const result = await createUser(user);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password_hash, email, role_id } = req.body;

        if(!username || !password || !email || !role_id) throw new Error('Missing fields');
        if(!passwordRegex.test(password)) throw new Error('Password must contain at least one uppercase letter, one lowercase letter and one number');
        if(password.length<8) throw new Error('Password must be at least 8 characters long');
        if(username.length<3) throw new Error('Username must be at least 3 characters long');
        if(!emailRegex.test(email)) throw new Error('Invalid email');

        const result = await client.query('UPDATE users SET username=$1, password_hash=$2, email=$3, role_id=$4 WHERE user_id=$5 RETURNING *', [username, password_hash, email, role_id, id]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('DELETE FROM users WHERE user_id=$1', [id]);
        res.status(200).json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await client.query('SELECT * FROM users WHERE username=$1', [username]);

        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const passwordCorrect = await bcrypt.compare(password, user.rows[0].password_hash);

        if (!passwordCorrect) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const userForToken = {
            username: user.rows[0].username,
            id: user.rows[0].user_id,
            role: user.rows[0].role_id
        }

        const token = jwt.sign(userForToken, 'test', { expiresIn:'30m'}); //Expires in an hour
        
        if (user.rows.length > 0) {
            res.status(200).json({
                token,
                username: user.rows[0].username,
                id: user.rows[0].user_id,
                role: user.rows[0].role_id
            });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
