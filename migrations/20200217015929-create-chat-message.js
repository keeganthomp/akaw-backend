'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ChatMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chatId: {
        type: Sequelize.INTEGER,
        field: 'chat_id',
        allowNull: false
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'sender_id'
      },
      receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'receiver_id'
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        field: 'is_read',
        defaultValue: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ChatMessages')
  }
}
