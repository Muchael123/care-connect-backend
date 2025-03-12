import Nurse from "../../models/nurse.js";

export default async function getDoctorsByHospitalId(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Hospital ID is required." });
        }
        const doctors = await Nurse.find({ hospital: id }).populate("user", "email phoneNumber firstName lastName");

        if (!doctors || doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found for this hospital." });
        }

        res.json(
            doctors.map(doctor => ({
                id: doctor._id,
                email: doctor.user.email,
                phone: doctor.user.phoneNumber || null,
                full_name: `${doctor.user.firstName} ${doctor.user.lastName}`,
                specialty: doctor.specialty
            }))
        );
    } catch (error) {
        console.error("Error fetching doctors by hospital ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
