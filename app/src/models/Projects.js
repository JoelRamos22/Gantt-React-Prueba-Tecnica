const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Project = sequelize.define('Project', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    endDate: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'projects',
    timestamps: true
});

module.exports = Project;
