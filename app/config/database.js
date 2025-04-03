const { Sequelize } = require('sequelize');


// Creacion de una nueva instancia de Sequelize 
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './tmp/database.sqlite',
  });

module.exports = sequelize;

