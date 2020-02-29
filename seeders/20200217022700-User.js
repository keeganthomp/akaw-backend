'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'jimmy@example.com',
          username: 'jimmy',
          user_verified: true,
          account_type: 'surfer',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'tommy',
          email: 'tommy@example.com',
          user_verified: true,
          account_type: 'surfer',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'sarah',
          email: 'sarah@example.com',
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
