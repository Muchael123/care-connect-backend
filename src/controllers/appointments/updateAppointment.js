import Appointment from "../../models/appointment.js";

export default async function updateAppointment(req, res) {
  const { id, role } = req.user;

  const { appointmentid } = req.params;
  console.log("id = ",id, appointmentid);
    if (role === "nurse") {
        const { status } = req.body;
        if(!status){
           return res.status(400).json({message: "status is required"})
        }
        try {
        const appointment = await Appointment.findOneAndUpdate({ _id: appointmentid, nurse: id }, { status }, { new: true });
        console.log("Appointment = ",appointment);
        if (!appointment) {
            console.log("Appointment not found");
            return res.status(404).json({ message: "Appointment not found" });
        }
        return res.status(200).json({ message: "Appointment updated", appointment });
        } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An erro occured. Try again later" });
        }
    } else if(role === "patient"){
        const {reason, date, time} = req.body;
        //all the body are optional
        const update = {};
        if(reason){
            update.reason = reason;
        }
        if(date){
            update.date = date;
        }
        if(time){
            update.time = time;
        }
        try {
            const appointment = await Appointment.findOneAndUpdate({ _id: appointmentid, patient: id }, update
            , { new: true });
            if (!appointment) {
                return res.status(404).json({ message: "Appointment not found" });
            }
            return res.status(200).json({ message: "Appointment updated", appointment });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "An erro occured. Try again later" });
        }

    }

}