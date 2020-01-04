const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
var fs = require('fs')
var https = require('https')

require('dotenv').config()

const isProduction = process.env.NODE_ENV !== 'dev'

const API_PORT = 3005
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const databaseName = isProduction
  ? process.env.PROD_DB_NAME
  : process.env.DEV_DB_NAME

const DB_ROUTE = `mongodb+srv://${dbUsername}:${dbPassword}!@surfing-it-zykrc.mongodb.net/${databaseName}?retryWrites=true&w=majority`

const app = express()
app.use(cors())

const { initializeRoutes } = require('./routes')
const router = express.Router()

// connects our back end code with the database
mongoose.connect(DB_ROUTE, { useNewUrlParser: true })

const db = mongoose.connection

// checks if connection with the database is successful
db.once('open', () => console.log('connected to the database'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

initializeRoutes({ router })

// append /api for our http requests
app.use('/api', router)

const key = fs.readFileSync('./key.pem')
const cert = fs.readFileSync('./cert.pem')

// launch our backend into a port
const server = https.createServer(
  {
    key,
    cert
  },
  app
)

server.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`))
