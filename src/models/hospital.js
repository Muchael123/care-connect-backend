

import { Schema, model } from "mongoose";

const hospitalSchema = new Schema({
  name: { type: String, required: true },
  addedby: { type: Schema.Types.ObjectId, ref: "User", required: true },
  level: {
    type: Number, 
    required: true, 
    min: [1, "Level must be at least 1"],
    max: [7, "Level cannot exceed 7"],
 },
  location: {
    type: { type: String, enum: ["Point"], required: true, default: "Point" },
    coordinates: { type: [Number], required: true }, 
  }, 
}, {versionKey: false});
hospitalSchema.index({ location: "2dsphere" });

hospitalSchema.pre("findOneAndDelete", async function (next) {
  const hospitalId = this.getQuery()._id;
  await mongoose.model("Nurse").deleteMany({ hospital: hospitalId });
  next();
});

const Hospital = model("Hospital", hospitalSchema);

export default Hospital;
