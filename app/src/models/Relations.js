const Project = require('./Projects');
const Task = require('./Task');

// Definir relaciones después de importar ambos modelos
Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

module.exports = { Project, Task };
