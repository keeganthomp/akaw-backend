const { Router } = require('express')
const router = Router()

import { initializeUserRoutes } from './users'
import { initializeChatRoutes } from './chats'

const initializeRoutes = ({ router }) => {
  initializeUserRoutes({ router })
  initializeChatRoutes({ router })
}

initializeRoutes({ router })

module.exports = router
