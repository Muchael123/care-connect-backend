import jwt from 'jsonwebtoken';
export default function ValidateUserToken(req, res, next){
    console.log(req.header('Authorization'));
    if(!req?.header('Authorization')) return res.status(401).json({message: "Access denied. No token provided"});
    const token = req?.header('Authorization').split(' ')[1];
    console.log("token = ", token);
    if(!token) return res.status(401).json({message: "Access denied. No token provided"});
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verified);
        req.user = verified;
        console.log("req.user = ", req.user);
        next();
    }
    catch(e){
        res.status(400).json({message: "Invalid token"});
    }

}