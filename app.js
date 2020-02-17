const db = require('./models')
require('dotenv').config()

const server = require('./server')

const PORT = process.env.PORT || 3300

initializeServer = async () => {
  try {
    await db.sequelize.sync()
    server.listen(PORT, () => {
      console.log(`Server is live at localhost:${PORT}`)
    })
  } catch (err) {
    console.log('Error conencting to database:', err)
  }
}

initializeServer()
