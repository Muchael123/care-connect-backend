import Appointments from "../../models/appointment.js";
export default async function getAppointments(req, res) {
  const { id, role } = req.user;
  try {
    let appointments = [];
    if (role === "patient") {
      appointments = await Appointments.find({
        patient: id
      }).populate("nurse", "firstName lastName");
    } else if (role === "nurse") {
        appointments = await Appointments.find({
            nurse: id
        }).populate("patient", "firstName lastName");
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
        res.status(200).json({ appointments });
    }
    catch (error) {
      console.log(error);
        return res.status(500).json({ message: error.message });
    }
}