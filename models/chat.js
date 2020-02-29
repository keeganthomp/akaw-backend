'use strict'
const { Op } = require('sequelize')
const ChatMessage = require('./chatMessage')

module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    userOneId: {
      field: 'user_one_id',
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    userTwoId: {
      field: 'user_two_id',
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
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
  })
  Chat.associate = models => {
    // creating an association for both user fields on a chat
    Chat.belongsTo(models.User, {
      as: 'user_one',
      foreignKey: 'user_one_id',
      onDelete: 'CASCADE'
    })
    Chat.belongsTo(models.User, {
      as: 'user_two',
      foreignKey: 'user_two_id',
      onDelete: 'CASCADE'
    })
    // a chat can consist of many messages
    Chat.hasMany(models.ChatMessage, {
      foreignKey: 'chat_id',
      as: 'messages',
      onDelete: 'CASCADE'
    })
  }
  return Chat
}
