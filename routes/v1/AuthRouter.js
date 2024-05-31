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
 *                 example: "user@mail.com"
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
    console.log('error', error);
    res.status(500).send({ error: 'Internal Server Error', message: error.message });
  }
});

/**
 * @swagger
 * /auth/register:
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
 *                 example: "user@mail.com"
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

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: int
 *                 example: 1
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 */

router.post("/logout", async (req, res, next) => {
  try {
    const { id } = req.body;
    await userService.logout(id);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ error: 'Internal Server Error', message: error.message });
  }
});

/**
 * @swagger
 * /auth/check-auth:
 *   post:
 *     summary: Check user authentication
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: int
 *                 example: 1
 *     responses:
 *       200:
 *         description: Authentication status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAuthenticated:
 *                   type: boolean
 *                   example: true
 */
router.post("/check-auth", async (req, res, next) => {
  console.log('hello', req.body);
  try {
    const { id } = req.body;
    res.status(200).json(await userService.checkAuth(id));
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ error: 'Internal Server Error', message: error.message });
  }
});
module.exports = router;