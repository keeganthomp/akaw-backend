'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Profiles',
      [
        {
										user_id: 1,
										username: 'jimmy',
          first_name: 'Jimmy',
          last_name: 'Johnson',
          equipment_offered: ['wetsuit', 'surfboard'],
          created_at: new Date(),
          updated_at: new Date()
        },
        {
										user_id: 2,
										username: 'tommy',
          first_name: 'Tommy',
          last_name: 'Thomas',
          equipment_offered: ['wetsuit', 'surfboard'],
          created_at: new Date(),
          updated_at: new Date()
        },
        {
										user_id: 3,
										username: 'sarah',
          first_name: 'Sarah',
          last_name: 'Smith',
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
