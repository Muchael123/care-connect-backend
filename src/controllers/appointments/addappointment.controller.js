import Appointment from "../../models/appointment.js";
import Nurse from "../../models/nurse.js";
import User from "../../models/user.js";

export default async function addAppointment(req, res) {
  const { id, role } = req.user;

  try {
    let appointmentData;

    if (role === "patient") {
      const { nurseid, reason, date, time } = req.body;
      
      
      const nurse = await Nurse.findOne({ user: nurseid }).populate('user');
      if (!nurse) {
        return res.status(404).json({ message: "Nurse not found" });
      }

      appointmentData = {
        patient: id,       
        nurse: nurseid,    
        reason,
        date,
        time,
      };
    } else if (role === "nurse") {
      const { patientid, reason, date, time } = req.body;

      const patient = await User.findById(patientid);
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }

      appointmentData = {
        patient: patientid,
        nurse: id,          
        reason,
        date,
        time,
        status: "approved"  
      };
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();
    return res.status(201).json({ message: "Appointment created" });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
