const { initializeUserRoutes } = require('./userRoutes')
const { initializeConversationRoutes } = require('./conversationRoutes')

const initializeRoutes = ({ router }) => {
  initializeConversationRoutes({ router })
  initializeUserRoutes({ router })
}

module.exports = {
  initializeRoutes
}
