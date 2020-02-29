'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
						},
						userVerified: {
							type: Sequelize.BOOLEAN,
							allowNull: false,
							defaultValue: false,
							field: 'user_verified'
						},
      accountType: {
        type: Sequelize.ENUM('surfer', 'surfee'),
        field: 'account_type'
      },
      username: {
        type: Sequelize.STRING,
								unique: true,
								isLowercase: true,
								allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};