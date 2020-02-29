'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      accountType: {
        type: DataTypes.ENUM('surfer', 'surfee'),
        field: 'account_type',
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
								allowNull: false,
								isLowercase: true
						},
						// has user verified account in AWS cognito
						userVerified: {
							type: DataTypes.BOOLEAN,
							allowNull: false,
							defaultValue: false,
							field: 'user_verified'
						},
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
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
  User.associate = models => {
    // user has one profile
    User.hasOne(models.Profile, {
      foreignKey: 'user_id',
      as: 'profile',
      onDelete: 'CASCADE'
				})
  }
  return User 
}
