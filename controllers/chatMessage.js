const models = require('../models')
const { findOrCreateChat } = require('./chat.js')
const { ChatMessage, Chat } = models

const createChatMessage = async (req, res) => {
  const { sender, receiver, text } = req.body
  try {
    const associatedChat = await findOrCreateChat({
      userOneId: sender.id,
      userTwoId: receiver.id
    })
    const newMessage = await ChatMessage.create({
      chatId: associatedChat.id,
      text,
      user: {
        _id: sender.id,
        name: sender.name,
        avatar: sender.profile.profilePicture
      }
    })
    await Chat.update(
      {
        lastMessageId: newMessage._id
      },
      {
        where: {
          id: associatedChat.id
        }
      }
    )
    res.send({
      newMessage,
      chat: associatedChat
    })
  } catch (error) {
    console.log('Error creating chat message:', error)
    res.status(500).json({
      error
    })
  }
}

module.exports = {
  createChatMessage
}
