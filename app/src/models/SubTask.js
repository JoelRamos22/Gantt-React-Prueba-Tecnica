const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Task = require('./Task');

const SubTask = sequelize.define('SubTask', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false }
});

SubTask.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });
Task.hasMany(SubTask, { foreignKey: 'taskId', as: 'subtasks' });

module.exports = SubTask;
