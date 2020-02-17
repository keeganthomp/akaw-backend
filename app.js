// const express = require('express')
// const router = express.Router()
// const logger = require('morgan')
// const { initializeRoutes } = require ('./routes')
// const bodyParser = require('body-parser')
const db = require('./models')


// const app = express()
// app.use(logger('dev'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

// initializeRoutes({ router })

// initializeDatabaseAndApi = async () => {
//   try {
//     await db.sequelize.sync()
//     app.listen(8000, () => console.log('App listening on port 8080!'))
//   } catch (err) {
//     console.log('Error conencting to database:', err)
//   }
// }

// initializeDatabaseAndApi()

require('dotenv').config();

const server = require('./server');

const PORT = process.env.PORT || 3300;

initializeServer = async () => {
  try {
    await db.sequelize.sync()
    server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
  } catch (err) {
    console.log('Error conencting to database:', err)
  }
}

initializeServer()

