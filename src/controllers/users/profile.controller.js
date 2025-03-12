import User from "../../models/user.js";

export default async function getUserProfile(req, res) {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    console.log(user, id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
        username: user.username ,
        email: user.email ,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        dob: user.dob,
        imageurl: user.imageurl,
        role: user.role,

    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}