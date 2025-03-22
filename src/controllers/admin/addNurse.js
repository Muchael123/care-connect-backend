import Joi from "joi";
import SendEmail from "../../lib/sendEmail.js";
import Nurse from "../../models/nurse.js";
import User from "../../models/user.js";
import bcrypt from "bcryptjs";

export default async function addNurse(req, res){
    const {id} = req.user;
    const {userid, hospitalid} = req.body;
    if(!hospitalid){
        return res.status(400).json({message: "Hospital id is required"});
    }
    
    if(userid){
        try{
            const user = await User.findOne({ _id: userid });
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            const nurse = await Nurse
            .findOne({ user: userid });
            if(nurse){
                return res.status(400).json({message: "Nurse already exists"});
            }
            const newNurse = new Nurse({
                user: userid,
                addedby: id,
                hospital: hospitalid
            });
            await newNurse.save();
            res.status(201).json({message: "Nurse added successfully"});
            
            return  SendEmail(user.email, `welcome Dr ${user.firstName} ${user.lastName}`, welcomeNurse(`${user.firstName} ${user.lastName}`, user.email) );
        } catch(error){
            console.log(error);
            return res.status(500).json({message: "An error occured. Try again later"});
        }
    } else{
        const userschema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            phone: Joi.string().required(),
            password: Joi.string().optional(),
            hospitalid: Joi.string().required(),
            specialty: Joi.array().items(Joi.string()).min(1).required()
        });
        const {error} = userschema.validate(req.body, {abortEarly: false});

        if(error){
            return res.status(400).json({message: error.message});
        }
        const {username, email,  firstName,  lastName, phone, password, specialty} = req.body
        const salt = bcrypt.genSaltSync(10);
        const mypass = password || process.env.DEFAULT_PASSWORD;
            const hashedPassword = bcrypt.hashSync(mypass, salt);
        try{
            const user = new User({
                username,
                email,
                firstName,
                lastName,
                phone,
                role: "nurse",
                password: hashedPassword,
                hospital: hospitalid,
                verified: true
            });
            await user.save();
            const newNurse = new Nurse({
                user: user._id,
                addedby: id,
                hospital: hospitalid,
                specialty
            });
            await newNurse.save();
            return res.status(201).json({message: "Nurse added successfully"});
        } catch(error){
            console.log(error);
            return res.status(500).json({message: "An error occured. Try again later"});
        }
    }
   
}