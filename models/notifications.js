'use strict'
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      type: {
        type: DataTypes.ENUM('message', 'booking'),
        allowNull: false
      },
      content: {
        allowNull: false,
        type: DataTypes.JSON,
						},
						userId: {
							field: 'user_id',
							type: DataTypes.INTEGER,
							allowNull: false,
					},
      hasBeenSeen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'has_been_seen'
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
  Notification.associate = models => {
    // notifications belongs to a user
    Notification.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
  }
  return Notification
}
