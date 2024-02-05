export const authMiddleWare = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization.split(' ')[1]==='test'){
        next();
    }else{
        res.status(401).json({error:"Unauthorized"});
    }
};