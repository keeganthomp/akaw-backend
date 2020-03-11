const models = require('../models')
const { Notification } = models
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const createNotification = async (req, res) => {
  const { userId, type, content } = req.body
  try {
    const newNotification = await Notification.create({
      type,
      content,
      userId,
      hasBeenRead: false
    })
    res.status(200).json({
      notification: newNotification
    })
  } catch (err) {
    console.log('Error adding notification:', err)
    res.status(500).json({
      err
    })
  }
}

const updateNotifications = async (req, res) => {
  const { notificationIds } = req.body
  try {
    const [numberOfItemsUpdated, updatedNotifications] = await Notification.update(
      {
        hasBeenSeen: true
      },
      {
        where: {
          id: {
            [Op.in]: notificationIds
          }
								},
								returning: true,
      }
				)
    res.status(200).json({
      message: 'success',
      notifications: updatedNotifications
    })
  } catch (err) {
    console.log('Error updating notification:', err)
    res.status(500).json({
      err
    })
  }
}

const getNotifications = async (req, res) => {
  const { userId } = req.params
  try {
    const notifications = await Notification.findAll({
      where: {
        userId,
        hasBeenSeen: false
      }
    })
    res.status(200).json({
      notifications
    })
  } catch (err) {
    console.log('Error fetching user notification:', err)
    res.status(500).json({
      err
    })
  }
}

module.exports = {
  createNotification,
  updateNotifications,
  getNotifications
}
