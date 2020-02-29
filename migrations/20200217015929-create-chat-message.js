'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ChatMessages', {
      text: Sequelize.STRING,
      user: Sequelize.JSON,
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      chatId: {
        type: Sequelize.INTEGER,
								allowNull: false,
								field: 'chat_id',
        references: {
          model: 'Chats',
          key: 'id'
        }
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
