import bcrypt from "bcryptjs";

export default async function HashPassword(req, res, next) {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    next();
  } catch (error) {
    res.status(500).send("Error hashing password");
  }
}