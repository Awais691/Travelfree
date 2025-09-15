import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

// Send request
router.post("/send", async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update request status
router.put("/:id", async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
