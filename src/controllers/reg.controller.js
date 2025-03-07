import SendEmail from "../lib/sendEmail.js";
import User from "../models/user.js";
import crypto from "crypto";

export default async function RegisterUser(req, res){
   try{
   const {email, password, username} = req.body;
   
   const userExists = await User.findOne({ email });
   

   if (userExists) return res.status(409).json({ message: 'User already exists' });

   const generateVerificationCode = () => {
      return crypto.randomInt(100000, 999999);
    };
    const token = generateVerificationCode();

   const user = await User.create({
      username,
      email,
      password,
      token
    });
    console.log(user)
    
    res.status(201).json({
      message: `User ${user.username} registered successfully`,
    });
    await SendEmail(user.username, token, user.email)
   }
   catch(e){
      console.log(e)
      res.status(500).json({error: "An error occured. Try again"})
   }
}