const express = require("express");
const router = express.Router();
const Task = require("../models/Tasks");
const { processText } = require("../services/taskService");

//GET
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

//POST
router.post("/extract", async (req, res) => {
  try {
    const { text, source } = req.body;

    const result = await processText(text, source);

    res.json({
      success: true,
      data: result.tasks
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// EDIT Mark as complete
router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );

    res.json({ success: true, task: updated });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;