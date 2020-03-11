'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'timmy@example.com',
          username: 'timmy',
          user_verified: true,
          account_type: 'surfer',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'keegan',
          email: 'keegan@example.com',
          user_verified: true,
          account_type: 'surfer',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'todd',
          email: 'todd@example.com',
          user_verified: true,
          account_type: 'surfee',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {})
  }
}
