import Nurse from "../../models/nurse.js";


export default async function getHospital(req, res) {
    const { hospitalid } = req.params;
    try{
        const nurses = await Nurse.find({ hospital: hospitalid }).populate("user", "name email phone");
        return res.status(200).json({nurses});
    } catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occured. Try again later"});
    }
}