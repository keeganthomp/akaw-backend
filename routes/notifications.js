import {
  createNotification,
  updateNotification,
  getNotifications
} from '../controllers/notifications'

export const intitializeNotificationRoutes = ({ router }) => {
  router.get('/notifications/:userId', getNotifications)
  router.post('/notifications/', createNotification)
  router.put('/notifications/:notificationId', updateNotification)
}
