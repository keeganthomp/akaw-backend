'use strict'
module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define(
    'ChatMessage',
    {
      chatId: {
        type: DataTypes.INTEGER,
        field: 'chat_id'
      },
      sender: {
        type: DataTypes.STRING
      },
      receiver: {
        type: DataTypes.STRING
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        field: 'is_read'
      },
      message: {
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {}
  )
  ChatMessage.associate = models => {
    // associations can be defined here
  }
  return ChatMessage
}
