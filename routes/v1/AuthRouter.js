const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 */

router.post("/login", async (req, res, next) => {
  try {
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
