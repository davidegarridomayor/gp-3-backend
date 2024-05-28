const express = require("express");
const router = express.Router();
const UserService = require("./../../services/v1/UserService");
const userService = new UserService();
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
 *                 example: "username"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInVzZXJuYW1lIjoibmV3dXNlckFBQTEyMyIsImlhdCI6MTcxNjkwODk1OCwiZXhwIjoxNzE2OTA5MjU4fQ.kWqPVXSpjR-EdrW7qBw--rg0obWy9W92MNvOXYvxWcM"
 *               tokenExpiration:
 *                 type: date
 *                 example: "2024-05-28T15:14:18.764Z"
 * 
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
    const { body: user } = req;
    res.status(200).json(await userService.login(user));
  } catch (error) {
    next(error);
  }
});



/**
 * @swagger
 * /auth/:
 *   post:
 *     summary: Register/Create a user
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
 *                 example: "username"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                     type: int
 *                     example: 1
 *                 username:
 *                     type: string
 *                     example: "newuser"
 *                 
 */
router.post("/register", async (req, res, next) => {
  try {
      const { body: user } = req;
      res.status(201).json(await userService.add(user));
  } catch (error) {
      next(error);
  }
});

module.exports = router;
