const express = require('express');
const router = express.Router();
const subTaskController = require('../controllers/SubTaskController');


/**
 * @swagger
 * /subtasks/task/{taskId}:
 *   get:
 *     summary: Obtiene todas las subtareas de una tarea principal
 *     tags:
 *       - Subtasks
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID de la tarea principal
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de subtareas de la tarea obtenida correctamente
 *       500:
 *         description: Error al obtener las subtareas de la tarea
 */
router.get('/:taskId', subTaskController.getAllByTask);

/**
 * @swagger
 * /subtasks/{id}:
 *   get:
 *     summary: Obtiene una subtarea específica por su ID
 *     tags:
 *       - Subtasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la subtarea
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subtarea obtenida correctamente
 *       404:
 *         description: Subtarea no encontrada
 *       500:
 *         description: Error al obtener la subtarea
 */
router.get('/sub/:id', subTaskController.getById);

/**
 * @swagger
 * /subtasks/create/{taskId}:
 *   post:
 *     summary: Crea una nueva subtarea en una tarea principal
 *     tags:
 *       - Subtasks
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID de la tarea principal en la que se creará la subtarea
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
 *                 example: "Subtarea de ejemplo"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-02"
 *               duration:
 *                 type: integer
 *                 example: 3
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-05"
 *     responses:
 *       201:
 *         description: Subtarea creada exitosamente
 *       404:
 *         description: Tarea principal no encontrada
 *       500:
 *         description: Error interno al crear la subtarea
 */
router.post('/create/:taskId', subTaskController.create);

/**
 * @swagger
 * /subtasks/update/{id}:
 *   put:
 *     summary: Actualiza una subtarea existente
 *     tags:
 *       - Subtasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la subtarea a actualizar
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
 *                 example: "Subtarea actualizada"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-03"
 *               duration:
 *                 type: integer
 *                 example: 4
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-07"
 *     responses:
 *       200:
 *         description: Subtarea actualizada correctamente
 *       404:
 *         description: Subtarea no encontrada
 *       500:
 *         description: Error al actualizar la subtarea
 */
router.put('/update/:id', subTaskController.update);

/**
 * @swagger
 * /subtasks/delete/{id}:
 *   delete:
 *     summary: Elimina una subtarea específica
 *     tags:
 *       - Subtasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la subtarea a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subtarea eliminada correctamente
 *       404:
 *         description: Subtarea no encontrada
 *       500:
 *         description: Error al eliminar la subtarea
 */
router.delete('/delete/:id', subTaskController.delete);

module.exports = router;
