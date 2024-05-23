const express = require("express");
const router = express.Router();


router.post("/login",
 async (req, res, next) => {
  try {
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
