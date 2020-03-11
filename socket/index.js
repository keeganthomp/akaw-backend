const server = require('../server')
const io = require('socket.io')(server)
const socketActions = require('./constants')

const {
  CONNECTION,
  MESSAGE_SENT,
  RECEIVE_MESSAGE,
  USER_IS_NOT_TYPING,
  USER_IS_TYPING,
  RECEIVE_TYPING_USER,
  RECEIVE_NON_TYPING_USER
} = socketActions

const mobileSockets = {}

const handleSocketConnect = ({ client }) => {
  const userId = client.handshake.query['userId']
  if (userId) {
    const socketId = client.id
    mobileSockets[userId] = socketId
  }
}

const emitActionToUser = ({ userId, action, payload }) => {
  const receiverId = userId
  const receiverSocketId = mobileSockets[receiverId]
  // if the user is connected to ths socket server, emit action
  if (receiverSocketId) {
    io.to(receiverSocketId).emit(action, payload)
  }
}

const handleMessageSend = ({ receiver, message, conversation, notification }) => {
  const userId = receiver.id
  emitActionToUser({
    userId,
    action: RECEIVE_MESSAGE,
    payload: {
      message,
						conversation,
						receiver, 
						notification: {...notification}
    }
  })
}

const handleUserIsTyping = ({ typingUser, receivingUser, chatId }) => {
  const userId = receivingUser.id
  const payload = {
    typingUserId: typingUser.id,
    receivingUserId: receivingUser.id,
    chatId
  }
  emitActionToUser({ userId, action: RECEIVE_TYPING_USER, payload })
}

const handleUserIsNotTyping = ({ typingUser, receivingUser, chatId }) => {
  const userId = receivingUser.id
  const payload = {
    typingUserId: typingUser.id,
    receivingUserId: receivingUser.id,
    chatId
  }
  emitActionToUser({
    userId,
    action: RECEIVE_NON_TYPING_USER,
    payload
  })
}

initializeSocket = () => {
  io.on(CONNECTION, client => {
    handleSocketConnect({ client })
    client.on(MESSAGE_SENT, ({ sender, receiver, message, conversation, notification }) =>
      handleMessageSend({ sender, receiver, message, conversation, notification })
    )
    client.on(USER_IS_TYPING, ({ typingUser, receivingUser, chatId }) =>
      handleUserIsTyping({ typingUser, receivingUser, chatId })
    )
    client.on(USER_IS_NOT_TYPING, ({ typingUser, receivingUser, chatId }) =>
      handleUserIsNotTyping({ typingUser, receivingUser, chatId })
    )
    client.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

module.exports = initializeSocket
