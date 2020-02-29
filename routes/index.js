const { Router } = require('express')
const router = Router()

import { initializeUserRoutes } from './users'
import { initializeChatRoutes } from './chat'
import { initializeProfileRoutes } from './profile'
import { initializeChatMessageRoutes } from './chatMessage'
import { intitializeNotificationRoutes } from './notifications'

const initializeRoutes = ({ router }) => {
  initializeUserRoutes({ router })
  initializeChatRoutes({ router })
  initializeProfileRoutes({ router })
  initializeChatMessageRoutes({ router })
  intitializeNotificationRoutes({ router })
}

initializeRoutes({ router })

module.exports = router
