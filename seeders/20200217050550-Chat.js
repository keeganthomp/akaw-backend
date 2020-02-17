'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Chats',
      [
        {
          user_one_id: 1,
          user_two_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_one_id: 2,
          user_two_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_one_id: 1,
          user_two_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
}
