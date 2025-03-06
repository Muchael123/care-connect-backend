import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export default async function Login(req, res){
    console.log("Loging in..")
    try{
    const {email, password, username} = req.body;
    

    const user = await User.findOne(username ? { username } : { email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    console.log("mached = ",isMatch)

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
        { id: user._id, role: user.role }, 
        process.env.JWT_SECRET,           
        { expiresIn: '30d' }               
    );
    res.status(200).json({ 
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

    }
    catch(e){
        console.log("An error occured", e)
        res.status(500).json({error: "An error occured. Try again later"})
    }
}