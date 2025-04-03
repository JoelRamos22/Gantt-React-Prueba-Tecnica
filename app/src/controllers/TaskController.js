const Task = require('../models/Task');
const sequelize = require('../../config/database');

// Obtener todas las tareas con sus subtareas
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { parentId: null }, 
            include: [{
                model: Task,
                as: 'subtasks' 
            }]
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todas las tareas' });
    }
};

// Obtener una tarea y sus subtareas por ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id, {
            include: [{
                model: Task,
                as: 'subtasks'
            }]
        });

        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};

// Crear una tarea o subtarea
exports.create = async (req, res) => {
    try {
        const { name, startDate, duration, endDate, parentId } = req.body;

        const task = await Task.create({
            name,
            startDate,
            duration,
            endDate,
            parentId: parentId || null 
        });

        res.status(201).json(task);
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ error: 'Error interno al crear la tarea' });
    }
};

// Actualizar una tarea o subtarea
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, startDate, duration, endDate, parentId } = req.body;

        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        await task.update({ name, startDate, duration, endDate, parentId });
        res.json({ message: 'Tarea actualizada', task });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};

// Eliminar una tarea y sus subtareas
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id, {
            include: [{ model: Task, as: 'subtasks' }]
        });

        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        if (task.subtasks.length > 0) {
            await Task.destroy({ where: { parentId: id } });
        }

        await task.destroy();
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};
