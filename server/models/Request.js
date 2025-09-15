import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  traveler: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accommodation: { type: mongoose.Schema.Types.ObjectId, ref: "Accommodation", required: true },
  status: { type: String, enum: ["Pending", "Accepted", "Declined"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Request", requestSchema);
