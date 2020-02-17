import { createChat, getChats } from '../controllers/chats'

export const initializeChatRoutes = ({ router }) => {
  router.get('/chats/:userId', getChats)
  router.post('/chat/', createChat)
}
