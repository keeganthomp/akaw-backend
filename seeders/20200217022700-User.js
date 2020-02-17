'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'jimmy@example.com',
          username: 'jimmy',
          account_type: 'surfer',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'tommy',
          email: 'tommy@example.com',
          account_type: 'surfer',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          username: 'sarah',
          email: 'sarah@example.com',
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
