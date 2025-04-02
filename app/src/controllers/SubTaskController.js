const SubTask = require('../models/SubTask');
const Task = require('../models/Task');


// Obtener todas las subtareas de una tarea principal
exports.getAllByTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const subtasks = await SubTask.findAll({ where: { taskId } });
    res.json(subtasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las subtareas de la tarea' });
  }
};

// Obtener una subtarea específica por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const subtask = await SubTask.findByPk(id);
    if (!subtask) {
      return res.status(404).json({ error: 'Subtarea no encontrada' });
    }
    res.json(subtask);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la subtarea' });
  }
};

// Crear una nueva subtarea en una tarea principal
exports.create = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { name, startDate, duration, endDate } = req.body;

    // Verificar que la tarea principal exista
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Tarea principal no encontrada' });
    }

    const subtask = await SubTask.create({
      name,
      startDate,
      duration,
      endDate,
      taskId
    });

    res.status(201).json(subtask);
  } catch (error) {
    console.error('Error al crear la subtarea:', error);
    res.status(500).json({ error: 'Error al crear la subtarea' });
  }
};

// Actualizar una subtarea existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startDate, duration, endDate } = req.body;
    const subtask = await SubTask.findByPk(id);
    if (!subtask) {
      return res.status(404).json({ error: 'Subtarea no encontrada' });
    }

    await subtask.update({ name, startDate, duration, endDate });
    res.json({ message: 'Subtarea actualizada', subtask });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la subtarea' });
  }
};

// Eliminar una subtarea
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const subtask = await SubTask.findByPk(id);
    if (!subtask) {
      return res.status(404).json({ error: 'Subtarea no encontrada' });
    }

    await subtask.destroy();
    res.json({ message: 'Subtarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la subtarea' });
  }
};
