'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Profiles',
      [
        {
										user_id: 1,
										username: 'timmy',
          first_name: 'Timmy',
          last_name: 'Thompson',
          equipment_offered: ['wetsuit', 'surfboard'],
          created_at: new Date(),
          updated_at: new Date()
        },
        {
										user_id: 2,
										username: 'keegan',
          first_name: 'Keegan',
          last_name: 'Kompson',
          equipment_offered: ['wetsuit', 'surfboard'],
          created_at: new Date(),
          updated_at: new Date()
        },
        {
										user_id: 3,
										username: 'todd',
          first_name: 'Todd',
          last_name: 'Thompson',
          equipment_offered: ['wetsuit', 'surfboard'],
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
