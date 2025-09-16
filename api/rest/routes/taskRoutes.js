const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authenticateToken = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Rotas de gerenciamento de tarefas
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Criar uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Comprar leite
 *     responses:
 *       201:
 *         description: Tarefa criada
 *       400:
 *         description: Limite de tarefas abertas atingido ou título ausente
 */
router.post("/tasks", authenticateToken, taskController.createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Listar minhas tarefas
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas do usuário
 */
router.get("/tasks", authenticateToken, taskController.listTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Marcar tarefa como concluída
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa marcada como concluída
 *       404:
 *         description: Tarefa não encontrada
 */
router.patch("/tasks/:id", authenticateToken, taskController.completeTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Deletar uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa deletada
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete("/tasks/:id", authenticateToken, taskController.deleteTask);

module.exports = router;
