const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { Message } = require('./MessageSchema')

const ConversationSchema = mongoose.model(
  'Conversation',
  new Schema(
    {
      between: Array,
      messages: [Message],
      lastMessage: Message
    },
    { timestamps: true }
  )
)

module.exports = {
  ConversationSchema
}
