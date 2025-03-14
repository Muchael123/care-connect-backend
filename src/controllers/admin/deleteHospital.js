import Hospital from "../../models/hospital.js";

export default async function deleteHospital(req, res){
    const {id} = req.user;
    const {hospitalid} = req.params;
    try{
        const hospital = await Hospital.findOneAndDelete({_id: hospitalid, addedby: id});
        if(!hospital){
            return res.status(404).json({message: "Hospital not found"});
        }
        return res.status(200).json({message: "Hospital deleted successfully"});
    } catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occured. Try again later"});
    }
}