const models = require('../models')
const { Notification } = models

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

const updateNotification = async (req, res) => {
  const { notificationId } = req.params
  try {
    await Notification.update(
      {
        hasBeenSeen: true
      },
      {
        where: {
          id: notificationId
        }
      }
    )
    res.status(200).json({
      message: 'success'
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
        userId
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
  updateNotification,
  getNotifications
}
