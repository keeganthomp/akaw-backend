const { ConversationSchema } = require('../schemas/ConversationSchema')
const Conversation = ConversationSchema

initializeConversationRoutes = ({ router }) => {
  router.post('/conversation', async (req, res) => {
    let newMessage
    const { sender, receiver, body, image } = req.body
    const doseConversationExist = await Conversation.exists({
      between: { $all: [sender, receiver] }
    })
    const hasRequiredMessageData = Boolean(sender && receiver && body)
    if (hasRequiredMessageData) {
      newMessage = {
        sender,
        receiver,
        body,
        image: image || null,
        read: false,
        createdAt: new Date().toISOString()
      }
    }
    if (doseConversationExist) {
      if (newMessage) {
        Conversation.findOneAndUpdate(
          { between: { $all: [sender, receiver] } },
          { $push: { messages: newMessage }, lastMessage: newMessage },
          { upsert: true },
          err => {
            if (err) {
              return res.send(500, { error: err })
            } else {
              return res.json({ success: true, newMessage })
            }
          }
        )
      } else {
        return res.json({
          success: false,
          error: 'Message requires a sender, reciever, and a body'
        })
      }
    } else {
      const NewConversation = new Conversation()
      NewConversation.between = [sender, receiver]
      ;(NewConversation.messages = newMessage ? [newMessage] : []),
        (NewConversation.lastMessage = newMessage)
      NewConversation.save((err, conversation) => {
        if (err) {
          return res.json({ success: false, error: err })
        } else {
          return res.json({ success: true, conversation })
        }
      })
    }
  })
  router.get('/conversation/between/:userOne/:userTwo', (req, res) => {
    const { userOne, userTwo } = req.params
    Conversation.findOne(
      { between: { $all: [userOne, userTwo] } },
      (err, conversation) => {
        console.log('CONVERSATION', conversation)
        if (conversation) {
          return res.json({ success: true, messages: conversation.messages })
        } else {
          return res.send(500, { error: 'conversation does not exist' })
        }
      }
    )
  })
  router.get('/conversation/:user', (req, res) => {
    const { user } = req.params
    Conversation.find({ between: { $all: [user] } }, (err, conversations) => {
      if (conversations) {
        return res.json({ success: true, conversations })
      } else {
        return res.send(500, { error: 'conversation does not exist' })
      }
    })
  })
  router.get('/conversation/notifications/:user', (req, res) => {
    const { user } = req.params
    Conversation.find({ between: { $all: [user] } }, (err, conversations) => {
      const unreadMessages = conversations.filter(conversation => {
        const { lastMessage } = conversation
        return (
          lastMessage &&
          lastMessage.sender !== user &&
          !lastMessage.read
        )
      })
      return res.json({ notifications: unreadMessages })
    })
  })
}

module.exports = {
  initializeConversationRoutes
}
