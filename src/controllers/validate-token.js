import User from "../models/user.js";

export default async function validateToken(req, res) {
    try {
        const { email, token } = req.body;

        // Validate input
        if (!email || !token) {
            return res.status(400).json({ error: "Token or email is required." });
        }

        const numericToken = Number(token);
        if (numericToken === 0) {
            return res.status(409).json({ error: "The code cannot be 0." });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user || user.token !== numericToken) {
            return res.status(409).json({ error: "Wrong email or code." });
        }

        // Reset token and save
        user.token = 0;
        await user.save();

        return res.status(200).json({ message: "User token reset successfully." });

    } catch (error) {
        console.error("Validation Error:", error);
        return res.status(500).json({ error: "A server error occurred. Please try again." });
    }
}
