import User from "../../models/user.js";

export default async function updateUserDetails(req, res){
    const {user} = req;
    const {image} = req;
    const {firstName, lastName, phoneNumber,username} = req.body;
    const updates = {};
    if(firstName) updates.firstName = firstName;
    if(lastName) updates.lastName = lastName;
    if(phoneNumber) updates.phone = phoneNumber;
    if(username) updates.username = username;
    
    try{
        const updateUser = await User.findByIdAndUpdate(user.id, {
            ...updates,
        }, {new: true
        })
        await updateUser.save();

       return res.status(200).json({message: "User details updated successfully",
            user: {
              
                email: updateUser.email,
                phone: updateUser.phone,
                id: updateUser._id,
                role: updateUser.role,
                username: updateUser.username,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
            }
        });

    }catch(error){
        console.error("Error updating user details:", error);
        res.status(500).json({message: "Internal server error"});
    }
}