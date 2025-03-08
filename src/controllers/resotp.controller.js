import User from "../models/user.js";
import crypto from "crypto";
import SendEmail from "../lib/sendEmail.js";

export default async function resendOTP(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

       
        const currentTime = new Date();
        if (user.AuthCode && user.AuthCode.expiry > currentTime) {
            return res.status(400).json({ message: "OTP is still valid. Please check your email." });
        }

        
        const newOTP = crypto.randomInt(100000, 999999);

       
        const expiryTime = new Date();
        expiryTime.setMinutes(expiryTime.getMinutes() + 30);

       
        user.AuthCode = { token: newOTP, expiry: expiryTime };
        await user.save();

        await SendEmail(user.username, newOTP, user.email,  expiryTime);

        return res.status(200).json({ message: "New OTP sent to your email." });

    } catch (error) {
        console.error("Resend OTP Error:", error.message);
        return res.status(500).json({ message: "An error occurred. Please try again." });
    }
}
