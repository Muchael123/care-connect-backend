import User from "../models/user.js";

export default async function UpdateFcm(req, res){
    try {
       
        const {fcm} = req.body;
        const user = req.user;
        if (!fcm) {
            return res.status(400).json({ message: "Fcm is required" });
        }
        const userdata = await User.findById(user.id);
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }
        for (let i = 0; i < userdata.fcm.length; i++) {
            if (userdata.fcm[i] === fcm) {
                return res.status(409).json({ message: "Fcm already exists." });
            }
        }
        userdata.fcm.push(fcm);
        await userdata.save();
        return res.status(200).json({ message: "Fcm updated successfully." });

    } catch (error) {
        console.error("Fcm Error:", error);
        return res.status(500).json({ error: "A server error occurred. Please try again." });
    }
}