const express = require("express");
const router = express.Router();
const TypeService = require("./../../services/v1/TypeService");
const typeService = new TypeService();


/**
 * @swagger
 * /type/:
 *   get:
 *     summary: Get all types
 *     tags: 
 *       - Types
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
 *         description: List of types
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
            res.json(await typeService.getAll(params));
        } catch (error) {
            next(error);
        }
    });

/**
 * @swagger
 * /type/:
 *   post:
 *     summary: Create a new type
 *     tags: 
 *       - Types
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "type description"
 *     responses:
 *       201:
 *         description: Type created successfully
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
        const { body: type } = req;
        res.status(201).json(await typeService.add(type));
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /type/{id}:
 *   get:
 *     summary: Get a type by ID
 *     tags: 
 *       - Types
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Type ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Type details
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
 *         description: Type not found
 *       500:
 *         description: Server error
 */
router.get("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await typeService.getById(id));
    } catch (error) {
      next(error);
    }
});

/**
 * @swagger
 * /type/{id}:
 *   put:
 *     summary: Update a type
 *     tags: 
 *       - Types
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: type ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   description:
 *                     type: string
 *                     example: "Updated type description"
 *     responses:
 *       200:
 *         description: Type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: Type not found
 *       500:
 *         description: Server error
 */
router.put("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body: type } = req;
      res.status(200).json(await typeService.update(id, type));
    } catch (error) {
      next(error);
    }
});


/**
 * @swagger
 * /type/{id}:
 *   delete:
 *     summary: Delete a type
 *     tags: 
 *       - Types
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: type ID
 *         example: 1
 *     responses:
 *       204:
 *         description: Type deleted successfully
 *       404:
 *         description: Type not found
 *       500:
 *         description: Server error
 */
router.delete("/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await typeService.remove(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
});


module.exports = router;