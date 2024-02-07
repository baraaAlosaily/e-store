import jwt from 'jsonwebtoken';
import { client } from '../db/db.js';


const getUserRole=async(token)=>{
    const decodedToken = jwt.verify(token, 'test'); 
    const res=await client.query('SELECT * FROM roles WHERE role_id=$1', [decodedToken.role]);
    return res.rows[0].role_name;  
}

export const userMiddleWare = async(req, res, next) => {
    const { authorization } = req.headers;
    if (authorization){
        const token = authorization.replace('Bearer ', '');
        try {
            const role=await getUserRole(token);
            if (role === "USER"){
                next();
            }else{
                res.status(403).json({error:"Not Matched or Unauthorized"});
            }
        } catch (error) {
            res.status(403).json({error:"Token expired or Unauthorized"});
        }
    }else{
        res.status(500).json({error:"No token provided or server error"});
    }
};


export const adminMiddleWare = async(req, res, next) => {
    const { authorization } = req.headers;
    if (authorization){
        const token = authorization.replace('Bearer ', '');
        try {
            const role=await getUserRole(token);
            if (role === "ADMIN"){
                next();
            }
        } catch (error) {
            res.status(403).json({error:"Token expired or Unauthorized"});
        }
    }else{
        res.status(500).json({error:"No token provided or server error"});
    }
};

export const superMiddleWare = async(req, res, next) => {
    const { authorization } = req.headers;
    if (authorization){
        const token = authorization.replace('Bearer ', '');
        try {
            const role=await getUserRole(token);
            if (role === "SUPER_ADMIN"){
                next();
            }
        } catch (error) {
            res.status(403).json({error:"Token expired or Unauthorized"});
        }
    }else{
        res.status(500).json({error:"No token provided or server error"});
    }
};