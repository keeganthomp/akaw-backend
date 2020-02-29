import { createChatMessage } from '../controllers/chatMessage'

export const initializeChatMessageRoutes = ({ router }) => {
  router.post('/chat-message/', createChatMessage)
}
 