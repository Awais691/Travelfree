import express from "express";
import Photo from "../models/Photo.js";

const router = express.Router();

// Upload photo
router.post("/upload", async (req, res) => {
  try {
    const photo = new Photo(req.body);
    await photo.save();
    res.json(photo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Like a photo
router.post("/:id/like", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo.likes.includes(req.body.userId)) {
      photo.likes.push(req.body.userId);
    }
    await photo.save();
    res.json(photo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all photos
router.get("/all", async (req, res) => {
  const photos = await Photo.find().populate("user", "name");
  res.json(photos);
});

export default router;
