const express = require("express");
const router = express.Router();

const UserService = require("./../../services/v1/UserService");
const userService = new UserService();
/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Retrieve a list of users
  *     tags: 
 *       - Users
 *     description: Retrieve a paginated list of users with optional search and sorting parameters.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query for usernames
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           example: 50
 *         description: Number of results per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number to retrieve
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: username
 *         description: Field to sort by (e.g., username)
 *       - in: query
 *         name: sortDesc
 *         schema:
 *           type: string
 *           enum: ['true', 'false']
 *           example: 'false'
 *         description: Sort direction (true for descending, false for ascending)
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of users
 *                 rows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: User ID
 *                       username:
 *                         type: string
 *                         description: Username
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Server error
 */
router.get("/",
  async (req, res, next) => {
    try {
      const params = req.query;
      res.json(await userService.getAll(params));
    } catch (error) {
      next(error);
    }
});


module.exports = router;
