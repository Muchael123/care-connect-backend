import mongoose from "mongoose";
import Nurse from "../../models/nurse.js";

export default async function getDoctorsByHospitalId(req, res) {
    try {
        const { id } = req.params;
        
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Hospital ID." });
        }

        const doctors = await Nurse.find({ hospital: id })
            .populate("user", "email phoneNumber firstName lastName");

        if (!doctors || doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found for this hospital." });
        }

        res.json(doctors.map(doctor => ({
            id: doctor.user?._id || null,
            email: doctor.user?.email || null, 
            phone: doctor.user?.phoneNumber || null,
            full_name: doctor.user 
                ? `${doctor.user.firstName} ${doctor.user.lastName}`
                : "Unknown Nurse", 
            specialty: doctor.specialty || []
        })));
        console.log(doctors);
        
    } catch (error) {
        console.error("Error fetching doctors by hospital ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
