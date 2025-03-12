import User from "../../models/user.js";

export default async function updateUserDetails(req, res){
    const {user} = req;
    const {image} = req;
    const {firstName, lastName, phoneNumber} = req.body;
    
    try{
        const updateUser = await User.findByIdAndUpdate(user.id, {
            
        })

    }catch(error){
        console.error("Error updating user details:", error);
        res.status(500).json({message: "Internal server error"});
    }
}