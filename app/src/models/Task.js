const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ProjectActivity = require('./ProjectActivity');

const Task = sequelize.define('tasks', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    projectActivityId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'projects', key: 'id' } 
    }
}, {
    tableName: 'tasks',
    timestamps: true
});

// Corregimos la relación para evitar problemas
Task.belongsTo(ProjectActivity, { foreignKey: 'projectActivityId', as: 'project' });
ProjectActivity.hasMany(Task, { foreignKey: 'projectActivityId', as: 'tasks' });

module.exports = Task;
