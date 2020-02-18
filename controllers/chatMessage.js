const models = require('../models')
const { ChatMessage, Chat, User } = models

const createChatMessage = async (req, res) => {
  const newMessage = req.body
  const { chatId, senderId, receiverId } = newMessage
  try {
    // if existing chat exist for these messages
    // use the existing chatId as the new message chatId
    // Otherwise, create a new chat and use the newly created chatId,
    // to find the chat to associate the new message to
    if (chatId) {
      const existingChatMessages = await ChatMessage.findAll({
        where: {
          chatId
        }
      })
      const sentMessage = await ChatMessage.create(
        {
          ...newMessage
        },
        {
          include: [
            {
              model: Chat,
              as: 'chat'
            },
            {
              model: User,
              as: 'sender'
            },
            {
              model: User,
              as: 'receiver'
            }
          ]
        }
      )
      res.status(200).json({
        sentMessage,
        allMessages: [...existingChatMessages, sentMessage]
      })
    } else {
      const { dataValues: newChat } = await Chat.create({
        userOneId: senderId,
        userTwoId: receiverId
      })
      const { id: newChatId } = newChat
      newMessage.chatId = newChatId
      const sentMessage = await ChatMessage.create(
        {
          ...newMessage
        },
        {
          include: [
            {
              model: Chat,
              as: 'chat'
            },
            {
              model: User,
              as: 'sender'
            },
            {
              model: User,
              as: 'receiver'
            }
          ]
        }
      )
      res.status(200).json({
        sentMessage
      })
    }
  } catch (err) {
    res.status(500).json({
      err
    })
  }
}

module.exports = {
  createChatMessage
}
