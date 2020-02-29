const db = require('./models')
require('dotenv').config()

const server = require('./server')
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3300

const mobileSockets = {}

initializeServer = async () => {
  try {
    await db.sequelize.sync()
    server.listen(PORT, () => {
      console.log(`Server is live at localhost:${PORT}`)
    })
    io.on('connection', client => {
      client.on('userLoggedIn', user => {
								const userId = user.id
								const socketId = client.id
								mobileSockets[userId] = socketId
      })
      client.on('messageSent', ({ sender, receiver, message }) => {
								const receiverId = receiver.id
								const senderId = sender.id
        client.emit('recieveMessage', message)
      })
    })
  } catch (err) {
    console.log('Error conencting to database:', err)
  }
}

initializeServer()
