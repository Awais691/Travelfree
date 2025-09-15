import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

// Send a message
router.post("/:chatId/message", async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    chat.messages.push({ sender: req.body.sender, text: req.body.text, image: req.body.image });
    await chat.save();
    res.json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get chat messages
router.get("/:chatId", async (req, res) => {
  const chat = await Chat.findById(req.params.chatId).populate("participants", "name");
  res.json(chat);
});

export default router;
