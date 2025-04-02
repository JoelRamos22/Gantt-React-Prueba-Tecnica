const Task = require('../models/Task');
const sequelize = require('../../config/database');
const ProjectActivity = require('../models/ProjectActivity');

// Obtener todas las tareas de un proyecto
exports.getAllByProject = async (req, res) => {
    try {
        const { projectActivityId } = req.params;
        const tasks = await Task.findAll({ where: { projectActivityId } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

// Obtener una tarea específica por ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        await sequelize.sync();
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};


//Crear una tarea existente
exports.create = async (req, res) => {
    try {
        const { projectActivityId } = req.params;
        const { name, startDate, duration, endDate } = req.body;

        console.log(`Buscando proyecto con ID: ${projectActivityId}`);

        const project = await ProjectActivity.findByPk(projectActivityId);
        
        if (!project) {
            return res.status(404).json({ error: `Proyecto con ID ${projectActivityId} no encontrado` });
        }

        console.log(`Proyecto encontrado: ${project.name}`);

        const task = await Task.create({
            name,
            startDate,
            duration,
            endDate,
            projectActivityId
        });

        res.status(201).json(task);
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ error: 'Error interno al crear la tarea' });
    }
};


// Actualizar una tarea existente
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, startDate, duration, endDate } = req.body;
        await sequelize.sync();
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        await task.update({ name, startDate, duration, endDate });
        await task.save();
        res.json({ message: 'Tarea actualizada', task });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};

// Eliminar una tarea
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await sequelize.sync();
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        await task.destroy();
        await task.save();
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};
