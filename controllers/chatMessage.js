const models = require('../models')
const { findOrCreateChat } = require('./chat.js')
const { ChatMessage } = models

const createChatMessage = async (req, res) => {
		const { sender, receiver, text } = req.body
  try {
    const newMessage = await ChatMessage.create({
      text,
      user: {
        _id: sender.id,
								name: sender.name,
								avatar: sender.profile.profilePicture
      }
				})
				const associatedChat = await findOrCreateChat({
					userOneId: sender.id,
					userTwoId: receiver.id
			})
				await newMessage.setChat(associatedChat)
    res.send({
      newMessage,
      chat: associatedChat
    })
  } catch (error) {
			console.log('ERRR', error)
    console.log('Error creating chat message:', error)
  }
}

module.exports = {
  createChatMessage
}
