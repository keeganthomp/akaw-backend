const models = require('../models')
const { Op } = require('sequelize')
const { User, Profile } = models

// one lower case letter, one upper case letter, one digit, 8 length, and no spaces
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
)

const createUser = async (req, res) => {
  const { email, accountType, username, password } = req.body
  const isPasswordValid = passwordRegex.test(password)
  const normalizedUsername = username.toLowerCase()
  if (isPasswordValid) {
    try {
      const newUser = await User.create({
        email,
        accountType,
        username: normalizedUsername
      })
      await Profile.create({
        userId: newUser.id,
        username: normalizedUsername
      })
      res.status(200).json({
        user: newUser
      })
    } catch (error) {
      if (error.errors) {
        res.status(500).json({
          error: error.errors[0]
        })
      } else {
        res.status(500).json({
          error
        })
      }
    }
  } else {
    res.status(500).json({
      error: {
        message:
          'Password must be at least 8 characters, contain one uppercase letter, one lowercase ltter'
      }
    })
  }
}

const verifyUser = async (req, res) => {
  const { username, id } = req.body
  let query
  if (id) {
    query = {
      id
    }
  } else {
    query = {
      username: username.toLowerCase()
    }
  }
  try {
    await User.update(
      {
        userVerified: true
      },
      {
        where: query
      }
    )
    res.status(200).json({
      message: 'User successfully verified'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Unable to verfy user'
    })
  }
}

const listUsers = async (req, res) => {
  const { accountType, userId } = req.params
  try {
    const users = await User.findAll({
      where: {
        accountType,
        userVerified: true,
        id: {
          [Op.not]: userId
        }
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
    console.log('Error fetching users list:', error)
    res.status(500).json({
      error
    })
  }
}

const getUser = async (req, res) => {
  const { userIdentifier } = req.params
  const isUserIdentifierNumber = Number.isInteger(Number(userIdentifier))
  let query
  if (isUserIdentifierNumber) {
    query = {
      id: userIdentifier
    }
  } else {
    query = {
      username: userIdentifier
    }
  }
  try {
    const user = await User.findOne({
      where: query,
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
    console.log('Error fetching user:', error)
    res.status(500).json({
      error
    })
  }
}

module.exports = {
  createUser,
  listUsers,
  getUser,
  verifyUser
}
