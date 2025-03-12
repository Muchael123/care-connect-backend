import Nurse from "../../models/nurse.js";

export default async function addAppointment(){
    const { id, role } = req.user;
    const { reason, date, time, nurseid } = req.body;
    if(role !== "patient"){
       //set status to be approved by default
    }
    const nursedata = await Nurse.findById(nurseid);
    if(!nursedata){
        return res.status(404).json({message: "Nurse not found"});
    }

}