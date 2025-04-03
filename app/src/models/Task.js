const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    endDate: { type: DataTypes.STRING, allowNull: false },
    parentId: { 
        type: DataTypes.INTEGER, 
        allowNull: true,  
        references: { model: 'tasks', key: 'id' }
    }
}, {
    tableName: 'tasks',
    timestamps: true
});

//Relacion con subtareas (una tarea puede tener muchas subtareas)
Task.hasMany(Task, { foreignKey: 'parentId', as: 'subtasks' });
Task.belongsTo(Task, { foreignKey: 'parentId', as: 'parentTask' });

module.exports = Task;
