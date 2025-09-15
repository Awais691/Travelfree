import express from "express";
import Accommodation from "../models/Accommodation.js";

const router = express.Router();

// Create new accommodation
router.post("/create", async (req, res) => {
  try {
    const acc = new Accommodation(req.body);
    await acc.save();
    res.json(acc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all accommodations
router.get("/all", async (req, res) => {
  const acc = await Accommodation.find().populate("host", "name email");
  res.json(acc);
});

export default router;
