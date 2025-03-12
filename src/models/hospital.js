

import { Schema, model } from "mongoose";

const hospitalSchema = new Schema({
  name: { type: String, required: true },
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
const Hospital = model("Hospital", hospitalSchema);

export default Hospital;
