const { Op } = require('sequelize')
const models = require('../models')
const { Chat, User, Profile } = models

const createChat = async (req, res) => {
  const newUserPayload = req.body
  try {
    const newUser = await User.create({
      ...newUserPayload
    })
    res.status(200).json({
      user: newUser
    })
  } catch (err) {
    res.status(500).json({
      err
    })
  }
}

const getUserChats = async (req, res) => {
  const { userId } = req.params
  const normalizedUserId = Number(userId)
  try {
    const chats = await Chat.findAll({
      // need to initially get all the chats for the user
      attributes: ['userOneId', 'userTwoId'],
      where: {
        [Op.or]: [
          { userTwoId: normalizedUserId },
          { userOneId: normalizedUserId }
        ]
      }
    })
    // returning all chats with user info
    const chatPromises = chats.map(async chat => {
      const {
        dataValues: { userOneId, userTwoId }
      } = chat
      return Chat.findAll({
        where: {
          [Op.or]: [
            { [Op.and]: [{ userOneId }, { userTwoId: userId }] },
            { [Op.and]: [{ userTwoId }, { userOneId: userId }] },
            { [Op.and]: [{ userOneId: userTwoId }, { userTwoId: userId }] },
            { [Op.and]: [{ userTwoId: userOneId }, { userOneId: userId }] }
          ]
        },
        include: [
          {
            model: User,
            as: 'userOne',
            required: false,
            include: [
              {
                model: Profile,
                as: 'profile'
              }
            ]
          },
          {
            model: User,
            as: 'userTwo',
            required: false,
            include: [
              {
                model: Profile,
                as: 'profile'
              }
            ]
          }
        ]
      })
    })
    const chatsWithUserInfo = await Promise.all(chatPromises)
    // due to how we are handling the promises, the result comes back as nested arrays
    // here, we are simply getting the first item (only item) in each of the arrays to return 
    // an array of objects insted of an array of arrays to client
    const formattedChats = chatsWithUserInfo.map(chat => chat[0])
    res.status(200).json({
      chats: formattedChats
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}

module.exports = {
  createChat,
  getUserChats
}
