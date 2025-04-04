
import mongoose from "mongoose";
const scheduleSchema = new mongoose.Schema({
  day: { type: String, required: true, enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },

});

const nurseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialty: [{ type: String, required: true }], 
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    schedule: [scheduleSchema],
    addedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }, { timestamps: true, versionKey: false });

  const Nurse = mongoose.model("Nurse", nurseSchema);
  export default Nurse;