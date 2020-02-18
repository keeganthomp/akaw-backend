'use strict'
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      userId: {
        type: DataTypes.INTEGER,
        unique: true,
        field: 'user_id',
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
      },
      profilePicture: {
        type: DataTypes.STRING,
        field: 'profile_picture'
      },
      equipmentOffered: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'equipment_offered'
      },
      equipmentNeeded: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'equipment_needed'
      },
      yearsOfExperience: {
        type: DataTypes.INTEGER,
        field: 'years_of_experience'
      },
      hourlyRate: {
        type: DataTypes.INTEGER,
        field: 'hourly_rate'
      },
      about: {
        type: DataTypes.TEXT
      },
      prefferedBeaches: {
        type: DataTypes.JSONB,
        field: 'preferred_beaches'
      },
      cprCertified: {
        type: DataTypes.BOOLEAN,
        field: 'cpr_certified'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {}
  )
  Profile.associate = models => {
    // every profile belongs to a user
    Profile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE'
    })
  }
  return Profile
}
