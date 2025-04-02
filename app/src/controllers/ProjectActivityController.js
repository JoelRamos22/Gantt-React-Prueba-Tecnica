const ProjectActivity = require('../models/ProjectActivity');
const sequelize = require('../../config/database');


// Obtener todas las actividades de proyecto
exports.getAll = async (req, res) => {
  try {
    const activities = await ProjectActivity.findAll();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
};

// Obtener una actividad de proyecto por su ID
exports.getById = async (req, res) => {
    try {
      const { id } = req.params;
      const activity = await ProjectActivity.findByPk(id);
  
      if (!activity) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
      }
  
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la actividad' });
    }
  };

// Crear una nueva actividad de proyecto
exports.create = async (req, res) => {
    try {
      const { name, startDate, duration, endDate } = req.body;
      await sequelize.sync();
      const activity = await ProjectActivity.create({ name, startDate, duration, endDate });
      await activity.save();
      res.json(activity);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Error al crear actividad' });
    }
};

    // Actualizar una actividad de proyecto
    exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, startDate, duration, endDate } = req.body;
        await sequelize.sync();
        const activity = await ProjectActivity.findByPk(id);
        if (!activity) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
        }

        await activity.update({ name, startDate, duration, endDate });
        await activity.save();
        res.json({ message: 'Actividad actualizada', activity });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la actividad' });
    }
    };

    // Eliminar una actividad de proyecto   
    exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await sequelize.sync();
        const activity = await ProjectActivity.findByPk(id);
        if (!activity) {
        return res.status(404).json({ error: 'Actividad no encontrada' });
        }

        await activity.destroy();
        await activity.save();
        res.json({ message: 'Actividad eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la actividad' });
    }
    };
