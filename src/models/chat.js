import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        role: { type: String, enum: ["user", "model"], required: true },
        parts: [
          {
            text: { type: String, required: true },
          },
        ],
        timestamp: { type: Date, default: Date.now },
      },
    ],
    systemActions: {
      type: [String],
      enum: [
        "view_nearby_hospitals",
        "view_nearby_professionals",
        "report_to_nurse",
      ],
      default: [],
    },
    patient_condition: { type: String },

    reportCount: { type: Number, default: 0 },
  },
  { apiVersion: false }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
