import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// Add review
router.post("/add", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get reviews for a user
router.get("/:userId", async (req, res) => {
  const reviews = await Review.find({ reviewedUser: req.params.userId }).populate("reviewer", "name");
  res.json(reviews);
});

export default router;
