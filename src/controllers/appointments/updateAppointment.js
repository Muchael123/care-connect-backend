import Appointment from "../../models/appointment";

export default async function updateAppointment(req, res) {
  const { id, role } = req.user;
  const { status } = req.body;
  const { appointmentid } = req.params;

  //if nurse, update status
    if (role === "nurse") {
        try {
        const appointment = await Appointment.findOneAndUpdate({ _id: appointmentid, nurse: id }, { status }, { new: true }); 
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