
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
        role: { type: String, enum: ["user", "model"], required: true }, 
        parts: [
         {
           text: { type: String, required: true },
          }
        ],
       timestamp: { type: Date, default: Date.now }
    }
  ],
  responses: [
    {
      patientResponse: { type: String, required: true },
      systemActions: {  type: [String], enum: ["view_nearby_hospitals", "view_nearby_professionals", "report_to_nurse"], default: [] }, 
      patientCondition: { type: String } 
    }
  ],
  reportCount: { type: Number, default: 0 },
},{apiVersion: false});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
