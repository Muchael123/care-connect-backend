import Appointment from "../../models/appointment.js";

export default async function deleteAppointment(req, res) {
    const { id, role } = req.user;
    const { appointmentid } = req.params;

    try{
        const appointment = await Appointment.findOneAndDelete({ _id
        : appointmentid, owner: id });

        if(!appointment){
            return res.status(401).json({message: "Can not delete this appointment"});
        }
        return res.status(200).json({message: "Appointment deleted"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occured. Try again later"});
    }
}