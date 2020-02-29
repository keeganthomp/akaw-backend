'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      profilePicture: {
        type: Sequelize.STRING,
        field: 'profile_picture'
      },
      hourlyRate: {
        type: Sequelize.INTEGER,
        field: 'hourly_rate'
      },
      equipmentOffered: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        field: 'equipment_offered'
      },
      equipmentNeeded: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        field: 'equipment_needed'
      },
      yearsOfExperience: {
        type: Sequelize.INTEGER,
        field: 'years_of_experience'
      },
      about: {
        type: Sequelize.TEXT
      },
      preferredBeaches: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        field: 'preferred_beaches'
      },
      cprCertified: {
        type: Sequelize.BOOLEAN,
        field: 'cpr_certified'
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
    return queryInterface.dropTable('Profiles')
  }
}
