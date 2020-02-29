import { listUsers, createUser, getUser, verifyUser } from '../controllers/users'

export const initializeUserRoutes = ({ router }) => {
  router.get('/user/list/:accountType/', listUsers)
  router.get('/user/:userIdentifier', getUser)
		router.post('/user/', createUser)
		router.post('/user/verify', verifyUser)
}
