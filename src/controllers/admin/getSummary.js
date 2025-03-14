import Hospital from "../../models/hospital.js";
import Nurse from "../../models/nurse.js";
import User from "../../models/user.js";

export default async function fetchSummary(req, res){
   
    try{
        //hospital count
        const hospitals = await Hospital.countDocuments();
        //Nurses
        const nurses = await Nurse.countDocuments();
        //Patients
        const patients = await User.countDocuments({role: "patient"});
        return res.status(200).json({hospitals, nurses, patients});
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occured. Try again later"});
    }
}