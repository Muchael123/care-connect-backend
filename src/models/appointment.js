import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    nurse: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending",
    },
    reason: { type: String, required: true },
    time: { type: String, required: true }, 

  }, {versionKey: false});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment; 