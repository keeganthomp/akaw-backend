const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'akaw-dev',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt
    }
  },
  production: {
    username: 'postgres',
    password: null,
    database: 'akaw',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt
    }
  }
}
