const socketServer = require('http').createServer.listen(3005)

const io = require('socket.io')(server)
const models = require('../models')
const { Chat, ChatMessage, User } = models
const { findOrCreateChat } = require('../controllers/chat')

const mobileSockets = {}

io.on('connection', socket => {
  socket.on('newUser', async username => {
    const foundUser = await User.findOne({
      where: {
        username
      }
    })
    // mobileSockets[user[0].id] = socket.id;
    console.log('FOUND USER IN SOCKET', foundUser)
  })
})

socketServer.listen(SOCKET_PORT, err => {
	if (err) throw err
	console.log(`listening on port ${SOCKET_PORT}`)
})

