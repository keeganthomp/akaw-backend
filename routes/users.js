import { getUsers, createUser } from '../controllers/users'

export const initializeUserRoutes = ({ router }) => {
  router.get('/users/:accountType', getUsers)
  router.post('/user/', createUser)
}
