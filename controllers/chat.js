const { Op } = require('sequelize')
const models = require('../models')
const { Chat, User, Profile, ChatMessage } = models

const getUserChats = async (req, res) => {
  const { userId } = req.params
  const normalizedUserId = Number(userId)
  try {
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [
          { user_one_id: normalizedUserId },
          { user_two_id: normalizedUserId }
        ]
      },
      order: [[{ model: ChatMessage, as: 'messages' }, 'created_at', 'desc']],
      attributes: { exclude: ['user_one_id', 'user_two_id'] },
      include: [
        {
          model: User,
          as: 'user_one',
          attributes: ['id', 'email', 'account_type'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: [
                'first_name',
                'last_name',
                'username',
                'profile_picture'
              ]
            }
          ]
        },
        {
          model: User,
          as: 'user_two',
          attributes: ['id', 'email', 'account_type'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: [
                'first_name',
                'last_name',
                'username',
                'profile_picture'
              ]
            }
          ]
        },
        {
          model: ChatMessage,
          as: 'messages'
        }
      ]
				})
    res.status(200).json({
      chats
    })
  } catch (error) {
    console.log('Error fetching chats:', error)
    res.status(500).json({
      error
    })
  }
}

const findOrCreateChat = async ({ userOneId, userTwoId }) => {
  try {
    const conversation = await Chat.findOne({
      where: {
        user_one_id: {
          [Op.or]: [userOneId, userTwoId]
        },
        user_two_id: {
          [Op.or]: [userOneId, userTwoId]
        }
      },
      order: [[{ model: ChatMessage, as: 'messages' }, 'created_at', 'desc']],
      include: [
        {
          model: ChatMessage,
          as: 'messages'
        }
      ]
    })
    if (conversation) {
      return conversation
    } else {
      return Chat.create(
        {
          user_one_id: userOneId,
          user_two_id: userTwoId
        },
        {
          include: [
            {
              model: ChatMessage,
              as: 'messages'
            }
          ]
        }
      )
    }
  } catch (error) {
    console.log('Error creating or updating conversation:', error)
  }
}

getConversation = async (req, res) => {
  const { userOneId, userTwoId } = req.params
  try {
    const conversation = await Chat.findOne({
      where: {
        user_one_id: {
          [Op.or]: [userOneId, userTwoId]
        },
        user_two_id: {
          [Op.or]: [userOneId, userTwoId]
        }
      },
      order: [[{ model: ChatMessage, as: 'messages' }, 'created_at', 'desc']],
      include: [
        {
          model: ChatMessage,
          as: 'messages'
        }
      ]
    })
    if (conversation) {
      res.status(200).json({
        chat: conversation
      })
    } else {
      const newConversation = await Chat.create(
        {
          user_one_id: userOneId,
          user_two_id: userTwoId
        },
        {
          order: [
            [{ model: ChatMessage, as: 'messages' }, 'created_at', 'desc']
          ],
          include: [
            {
              model: ChatMessage,
              as: 'messages',
              order: ['created_at', 'ASC']
            }
          ]
        }
      )
      res.status(200).json({
        chat: newConversation
      })
    }
  } catch (error) {
    console.log('Error getting conversation between users:', error)
    res.status(500).json({
      error
    })
  }
}

module.exports = {
  findOrCreateChat,
  getUserChats,
  getConversation
}
