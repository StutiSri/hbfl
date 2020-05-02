const Sequelize = require('sequelize')

const host = 'ssuser.c7avxdq61yav.us-east-1.rds.amazonaws.com'
const database = 'ssuser'
const username = 'admin'
const password = 'mypassword'

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 5000
  }
})

module.exports = sequelize
