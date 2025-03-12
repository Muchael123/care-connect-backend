import User from "../models/user.js";

export default async function UpdaterUserLocation (req, res){
    const {latitude, longitude} = req.body;
   
    const user = req.user;
    try{
        const userData = await User.findByIdAndUpdate(user.id, {
            location: {
                type: "Point",
               coordinates: [longitude, latitude]
            }
        },  { new: true });
        if(!userData){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "Location updated",  location: userData.location.coordinates});
    } catch{
        console.error("Error updating user location", err);
        return res.status(500).json({message: "Internal server error"});
    }
}