import { getConversation, getUserChats } from '../controllers/chat'

export const initializeChatRoutes = ({ router }) => {
  router.get('/chat/:userId', getUserChats)
  router.get('/chat/conversation/:userOneId/:userTwoId', getConversation) 
}
