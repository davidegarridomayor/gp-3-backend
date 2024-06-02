const express = require("express");
const router = express.Router();

const StatusService = require("./../../services/v1/StatusService");
const statusService = new StatusService();
/**
 * @swagger
 * /status/:
 *   get:
 *     summary: Retrieve a list of Status
  *     tags: 
 *       - Status
 *     description: Retrieve a paginated list of status with optional search and sorting parameters.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query for status
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
    console.log('helo');
    try {
      const params = req.query;
      res.json(await statusService.getAll(params));
    } catch (error) {
      next(error);
    }
});


/**
 * @swagger
 * /status/:
 *   post:
 *     summary: Create a Status
 *     tags: 
 *       - Status
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
router.post("/", async (req, res, next) => {
    try {
        const { body: status } = req;
        res.status(201).json(await statusService.add(status));
    } catch (error) {
        console.log('error', error);
        next(error);
    }
  });

/**
 * @swagger
 * /status/{id}:
 *   put:
 *     summary: Update a user
 *     tags: 
 *       - Status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: "newusername@mail.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "newusername@mail.com"
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body: status } = req;
      res.status(200).json(await statusService.update(id, status));
    } catch (error) {
      next(error);
    }
});

/**
 * @swagger
 * /status/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: 
 *       - Status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await statusService.remove(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
});


module.exports = router;
