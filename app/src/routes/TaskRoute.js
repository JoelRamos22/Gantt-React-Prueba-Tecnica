const express = require('express');
const router = express.Router();
const Taskscontroller = require('../controllers/TaskController');

/**
 * @swagger
 * /tasks/project/{projectActivityId}:
 *   get:
 *     summary: Obtiene todas las tareas de un proyecto
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: projectActivityId
 *         required: true
 *         description: ID del proyecto al que pertenecen las tareas
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida correctamente
 *       500:
 *         description: Error al obtener las tareas
 */
router.get('/:projectActivityId', Taskscontroller.getAllByProject);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea por su ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a buscar
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
router.get('/:id', Taskscontroller.getById);

/**
 * @swagger
 * /tasks/create/{projectActivityId}:
 *   post:
 *     summary: Crea una nueva tarea en un proyecto específico
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: projectActivityId
 *         required: true
 *         description: ID del proyecto en el que se creará la tarea
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
 *                 example: "Diseño de base de datos"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-02"
 *               duration:
 *                 type: integer
 *                 example: 5
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-07"
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error interno al crear la tarea
 */
router.post('/create/:projectActivityId', Taskscontroller.create);

/**
 * @swagger
 * /tasks/update/{id}:
 *   put:
 *     summary: Actualiza los datos de una tarea existente
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
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
 *                 example: "2025-04-02"
 *               duration:
 *                 type: integer
 *                 example: 3
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-05"
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al actualizar la tarea
 */
router.put('/update/:id', Taskscontroller.update);

/**
 * @swagger
 * /tasks/delete/{id}:
 *   delete:
 *     summary: Elimina una tarea específica
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
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
router.delete('/delete/:id', Taskscontroller.delete);

module.exports = router;
