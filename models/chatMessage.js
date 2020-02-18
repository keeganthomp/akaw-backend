'use strict'
module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define(
    'ChatMessage',
    {
      chatId: {
        type: DataTypes.INTEGER,
        field: 'chat_id',
        allowNull: false
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sender_id'
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'receiver_id'
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        field: 'is_read',
        defaultValue: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
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
    // associating chat messages to a chat
    // a chat message can only belong to one chat
    ChatMessage.belongsTo(models.Chat, {
      foreignKey: 'chat_id',
      as: 'chat',
      onDelete: 'CASCADE'
    })
    // each sender and receiver must be a user
    ChatMessage.belongsTo(models.User, {
      foreignKey: 'sender_id',
      as: 'sender',
      onDelete: 'CASCADE'
    })
    ChatMessage.belongsTo(models.User, {
      foreignKey: 'receiver_id',
      as: 'receiver',
      onDelete: 'CASCADE'
    })
  }
  return ChatMessage
}
