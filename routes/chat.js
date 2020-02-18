import { createChat, getUserChats } from '../controllers/chat'

export const initializeChatRoutes = ({ router }) => {
  router.get('/chats/:userId', getUserChats)
  router.post('/chat/', createChat)
}
