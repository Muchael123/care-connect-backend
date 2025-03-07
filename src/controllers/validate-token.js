import User from "../models/user.js";

export default async function validateToken(req, res) {
    try {
        const { email, code } = req.body;

        // Validate input
        if (!email || !code) {
            return res.status(400).json({ error: "Token or email is required." });
        }

        const numericToken = Number(code);
        if (numericToken === 0) {
            return res.status(409).json({ error: "The code cannot be 0." });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user || user.AuthCode.token !== numericToken) {
            return res.status(409).json({ error: "Wrong email or code." });
        }

        // Check if token is expired
        const now = new Date();
        if (now > user.AuthCode.expiry) {
            // Reset the token and save user
            user.AuthCode.token = null; 
            user.AuthCode.expiry = null;
            await user.save();
            
            return res.status(410).json({ error: "Verification code has expired. Please request a new one." });
        }

        // If token is valid, verify the user
        user.AuthCode.token = null;  // Reset the token after successful verification
        user.AuthCode.expiry = null;
        user.verified = true;
        await user.save();

        return res.status(200).json({ message: "User code verified successfully." });

    } catch (error) {
        console.error("Validation Error:", error);
        return res.status(500).json({ error: "A server error occurred. Please try again." });
    }
}
