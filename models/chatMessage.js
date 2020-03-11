'use strict'
module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define(
    'ChatMessage',
    {
      text: DataTypes.STRING,
      user: DataTypes.JSON,
      _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'chat_id'
      },
      hasBeenSeen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'has_been_seen'
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
    // creating an association for both user fields on a chat
				ChatMessage.belongsTo(models.Chat, {
						as: 'last_message',
						foreignKey: '_id',
						onDelete: 'CASCADE',
				})
    ChatMessage.belongsTo(models.Chat, {
      as: 'messages',
      foreignKey: 'chat_id',
      onDelete: 'CASCADE'
    })
  }
  return ChatMessage
}
