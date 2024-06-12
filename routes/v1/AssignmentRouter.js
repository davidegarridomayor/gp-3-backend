const express = require("express");
const router = express.Router();
const AssignmentService = require("./../../services/v1/AssignmentService");
const assignmentService = new AssignmentService();


/**
 * @swagger
 * /comment/:
 *   get:
 *     summary: Get all roles
 *     tags: 
 *       - Role
 *     parameters:
 *       - in: query
 *         name: params
 *         schema:
 *           type: object
 *           properties:
 *             q:
 *               type: string
 *               description: Search query
 *             perPage:
 *               type: integer
 *               description: Items per page
 *             page:
 *               type: integer
 *               description: Page number
 *             sortBy:
 *               type: string
 *               description: Sort by field
 *             sortDesc:
 *               type: boolean
 *               description: Sort in descending order
 *         description: Query parameters
 *     responses:
 *       200:
 *         description: List of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   description:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/",
    async (req, res, next) => {
        try {
            const params = req.query;
            res.json(await assignmentService.getAll(params));
        } catch (error) {
            next(error);
        }
    });

/**
 * @swagger
 * /ticket/:
 *   post:
 *     summary: Create a new ticket
 *     tags: 
 *       - Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Ticket description"
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res, next) => {
    try {
        const { body: assignment } = req;
        console.log('role', assignment);
        res.status(201).json(await assignmentService.add(assignment));
    } catch (error) {
        console.log('errorsito', error);
        next(error);
    }
});


/**
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: 
 *       - Role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ticket ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Ticket details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 description:
 *                   type: string
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.get("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await assignmentService.getById(id));
    } catch (error) {
      next(error);
    }
});

router.get("/by-user/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await assignmentService.getByUserId(id));
    } catch (error) {
      next(error);
    }
});

/**
 * @swagger
 * /role/{id}:
 *   put:
 *     summary: Update a role
 *     tags: 
 *       - Role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ticket ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Updated ticket description"
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.put("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body: assignment } = req;
      console.log('edited role', assignment);
      res.status(200).json(await assignmentService.update(id, assignment));
    } catch (error) {
      next(error);
    }
});


/**
 * @swagger
 * /role/{id}:
 *   delete:
 *     summary: Delete a role
 *     tags: 
 *       - Role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ticket ID
 *         example: 1
 *     responses:
 *       204:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await assignmentService.remove(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
});


module.exports = router;