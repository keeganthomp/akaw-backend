'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('message', 'booking'),
        allowNull: false
      },
      content: {
        allowNull: false,
								type: Sequelize.JSON,
								allowNull: false
      },
      userId: {
								field: 'user_id',
								type: Sequelize.INTEGER,
								allowNull: false,
								references: {
									model: 'Users',
									key: 'id'
							}
      },
      hasBeenSeen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'has_been_seen'
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
    return queryInterface.dropTable('Notifications')
  }
}
