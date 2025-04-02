const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectActivityController');

/**
 * @swagger
 * tags:
 *   - name: Project tasks
 *     description: Endpoints relacionados con la gestión de actividades de proyectos
 */


/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Obtiene todas las actividades de proyecto
 *     tags: 
 *       - Project tasks
 *     responses:
 *       200:
 *         description: Lista de todas las actividades de proyecto.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Proyecto A"
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-04-01T12:00:00Z"
 *                   duration:
 *                     type: integer
 *                     example: 10
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-04-11T12:00:00Z"
 *       500:
 *         description: Error al obtener las actividades
 */

router.get('/', controller.getAll);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Obtiene una actividad de proyecto por su ID
 *     tags: 
 *       - Project tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la actividad de proyecto a obtener
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Datos de la actividad obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Proyecto A"
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-04-01T12:00:00Z"
 *                 duration:
 *                   type: integer
 *                   example: 10
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-04-11T12:00:00Z"
 *       404:
 *         description: Actividad no encontrada
 *       500:
 *         description: Error al obtener la actividad
 */

router.get('/:id', controller.getById);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Crea una nueva actividad de proyecto
 *     tags: 
 *       - Project tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nueva Actividad"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-01T08:00:00Z"
 *               duration:
 *                 type: integer
 *                 example: 10
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-11T08:00:00Z"
 *     responses:
 *       201:
 *         description: Actividad creada exitosamente
 *       500:
 *         description: Error al crear la actividad
 */

router.post('/create/', controller.create);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Actualiza una actividad de proyecto
 *     tags: 
 *       - Project tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la actividad de proyecto a actualizar
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
 *                 example: "Proyecto actualizado"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-05T10:00:00Z"
 *               duration:
 *                 type: integer
 *                 example: 15
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-20T10:00:00Z"
 *     responses:
 *       200:
 *         description: Actividad actualizada correctamente
 *       404:
 *         description: Actividad no encontrada
 *       500:
 *         description: Error al actualizar la actividad
 */

router.put('/update/:id', controller.update);  

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Elimina una actividad de proyecto
 *     tags: 
 *       - Project tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la actividad de proyecto a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Actividad eliminada correctamente
 *       404:
 *         description: Actividad no encontrada
 *       500:
 *         description: Error al eliminar la actividad
 */


router.delete('/delete/:id', controller.delete);   

module.exports = router;
