
import mongoose from "mongoose";


const nurseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialty: [{ type: String, required: true }], 
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  });

  const Nurse = mongoose.model("Nurse", nurseSchema);
  export default Nurse;