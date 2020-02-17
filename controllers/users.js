const models = require('../models')
const { User } = models

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

const getUsers = async (req, res) => {
  const { accountType } = req.params
  try {
    const users = await User.findAll({
      where: {
        accountType
      }
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

module.exports = {
  createUser,
  getUsers
}
