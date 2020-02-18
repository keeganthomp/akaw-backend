'use strict'
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      userOneId: {
        type: DataTypes.INTEGER,
        field: 'user_one_id'
      },
      userTwoId: {
        type: DataTypes.INTEGER,
        field: 'user_two_id'
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
  Chat.associate = models => {
    // creating an association for both user fields on a chat
    Chat.belongsTo(models.User, {
      foreignKey: 'user_one_id',
      as: 'userOne',
      onDelete: 'CASCADE'
    })
    Chat.belongsTo(models.User, {
      foreignKey: 'user_two_id',
      as: 'userTwo',
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
