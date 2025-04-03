const Project = require('../models/Projects');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll(); 
        res.json(projects);
    } catch (error) {
        console.error('❌ Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Error interno al obtener proyectos' });
    }
};
