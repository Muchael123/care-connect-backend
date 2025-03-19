import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendPushNotification from "../lib/sendPushNotification.js";

export default async function Login(req, res) {
  try {
    const { password, username } = req.body;
    let user;
    user = await User
        .findOne({ username
        });
    if(!user){
      user = await User
      .findOne({ email: username
      });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    };
    const isMatch = bcrypt.compare(password, user.password);
    ;

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
    if (user?.fcm?.length > 0) {
      const sentfcm = await sendPushNotification(
        user.fcm,
        "Login",
        "New login detected on your account"
      );
    }
  } catch (e) {
    console.log("An error occured", e);
    res.status(500).json({ error: "An error occured. Try again later" });
  }
}
