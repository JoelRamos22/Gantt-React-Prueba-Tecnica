const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Definicion de la estructura de la tabla projects


const ProjectActivity = sequelize.define('ProjectActivity', { 
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },  
    endDate: { type: DataTypes.DATE, allowNull: false }
}, {
    tableName: 'projects',
    timestamps: true
});

module.exports = ProjectActivity;

