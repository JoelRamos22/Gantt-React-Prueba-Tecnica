const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/TaskController');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas y subtareas
 *     description: Retorna una lista de todas las tareas y subtareas en la base de datos.
 *     tags: 
 *       - Tasks
 *     responses:
 *       200:
 *         description: Lista de tareas y subtareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error al obtener las tareas
 */
router.get('/', TasksController.getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea o subtarea por su ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea o subtarea a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea obtenida correctamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al obtener la tarea
 */
router.get('/:id', TasksController.getById);

/**
 * @swagger
 * /tasks/create:
 *   post:
 *     summary: Crea una nueva tarea o subtarea
 *     description: Crea una nueva tarea (sin `parentId`) o una subtarea (con `parentId`).
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Diseño de base de datos"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-02"
 *               duration:
 *                 type: integer
 *                 example: 5
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-07"
 *               parentId:
 *                 type: integer
 *                 nullable: true
 *                 example: null
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       500:
 *         description: Error al crear la tarea
 */
router.post('/create', TasksController.create);

/**
 * @swagger
 * /tasks/update/{id}:
 *   put:
 *     summary: Actualiza los datos de una tarea o subtarea existente
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea o subtarea a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Actualizar documentación"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-02"
 *               duration:
 *                 type: integer
 *                 example: 3
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-05"
 *               parentId:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al actualizar la tarea
 */
router.put('/update/:id', TasksController.update);

/**
 * @swagger
 * /tasks/delete/{id}:
 *   delete:
 *     summary: Elimina una tarea o subtarea
 *     description: Si se elimina una tarea, también se eliminan sus subtareas asociadas.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea o subtarea a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al eliminar la tarea
 */
router.delete('/delete/:id', TasksController.delete);

module.exports = router;
