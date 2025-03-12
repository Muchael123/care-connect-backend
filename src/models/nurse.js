
import mongoose from "mongoose";
const scheduleSchema = new mongoose.Schema({
  day: { type: String, required: true, enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },

});

const nurseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialty: [{ type: String, required: true }], 
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    schedule: [scheduleSchema],
  });

  const Nurse = mongoose.model("Nurse", nurseSchema);
  export default Nurse;