const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Save User Data
router.post("/save", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({
      success: true,
      message: "User data saved"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get All Saved Reports
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Delete Report
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Report deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
module.exports = router;