module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'akaw-dev',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false
  },
  production: {
    username: 'postgres',
    password: null,
    database: 'akaw',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false
  }
}
