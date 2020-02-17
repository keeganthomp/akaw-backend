'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Profiles',
      [
        {
          user_id: 1,
          first_name: 'jimmy',
          last_name: 'jimmy last name',
          profile_picture: '<link-to-s3-image>',
          equipment_offered: ['wetsuit', 'surfboard'],
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 2,
          first_name: 'Tommy',
          last_name: 'Tommy last name',
          profile_picture: '<link-to-s3-image>',
          equipment_offered: ['wetsuit', 'surfboard'],
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 3,
          first_name: 'Sarah',
          last_name: 'Sarah last name',
          profile_picture: '<link-to-s3-image>',
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
