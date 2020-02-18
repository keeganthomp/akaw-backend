const models = require('../models')
const { User, Profile } = models

const createUser = async (req, res) => {
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

const listUsers = async (req, res) => {
  const { accountType } = req.params
  try {
    const users = await User.findAll({
      where: {
        accountType
      },
      include: [
        {
          model: Profile,
          as: 'profile'
        }
      ]
    })
    res.status(200).json({
      users
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}

const getUser = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: Profile,
          as: 'profile'
        }
      ]
    })
    res.status(200).json({
      user
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}

module.exports = {
  createUser,
  listUsers,
  getUser
}
