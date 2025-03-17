import jwt from 'jsonwebtoken';
export default function ValidateUserToken(req, res, next){
   
    if(!req?.header('Authorization')) return res.status(401).json({message: "Access denied. No token provided"});
    const token = req?.header('Authorization').split(' ')[1];
    
    if(!token) return res.status(401).json({message: "Access denied. No token provided"});
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(e){
        res.status(401).json({message: "Invalid token"});
    }

}