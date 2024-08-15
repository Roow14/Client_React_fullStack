const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rater_db', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
