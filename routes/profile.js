
import { createOrUpdateProfile, getProfile } from '../controllers/profile'

export const initializeProfileRoutes = ({ router }) => {
  router.get('/profile/:userId', getProfile)
  router.put('/profile/', createOrUpdateProfile)
}
