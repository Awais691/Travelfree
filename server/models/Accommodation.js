import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  roomType: { type: String, enum: ["Private", "Shared"], required: true },
  availability: { type: Boolean, default: true },
  rules: [String],
  photos: [String],
}, { timestamps: true });

export default mongoose.model("Accommodation", accommodationSchema);
