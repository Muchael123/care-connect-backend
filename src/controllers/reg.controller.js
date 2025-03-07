import SendEmail from "../lib/sendEmail.js";
import User from "../models/user.js";
import crypto from "crypto";

export default async function RegisterUser(req, res){
   try{
   const {email, password, username} = req.body;
   const userExist = await User
   .findOne({username})
   if(userExist) return res.status(409).json({message: "Username already exists"})

   const userExists = await User.findOne({ email });
   

   if (userExists) return res.status(409).json({ message: 'User already exists' });

   const generateVerificationCode = () => {
      return crypto.randomInt(100000, 999999);
    };
    const token = generateVerificationCode();

    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);

    // Create the new user
    const user = await User.create({
      username,
      email,
      password,
      AuthCode: {
        token,
        expiry: expiryTime
      }
    });
    console.log(user, expiryTime)

    await SendEmail(user.username, token, user.email, expiryTime);
    res.status(201).json({
      message: `User ${user.username} registered successfully. Check your email for verification code.`,
    });
  
   }
   catch(e){
      console.log(e)
      res.status(500).json({error: "An error occured. Try again"})
   }
}