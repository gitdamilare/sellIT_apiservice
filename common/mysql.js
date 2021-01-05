/*Sequelize mysql*/
var config = require('../config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    username: config.mysql.user,
    host: config.mysql.host,
    database: config.mysql.database,
    password: config.mysql.password,
    dialect: 'mysql',
    define: {
      timestamps: false,
      freezeTableName: true
    },
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },

  });

module.exports = sequelize;


////////////

