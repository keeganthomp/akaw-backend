import { listUsers, createUser, getUser } from '../controllers/users'

export const initializeUserRoutes = ({ router }) => {
  router.get('/users/:accountType', listUsers)
  router.get('/user/:userId', getUser)
  router.post('/user/', createUser)
}
