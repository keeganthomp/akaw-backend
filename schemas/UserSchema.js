const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = mongoose.model(
  'Users',
  new Schema(
    {
      email: String,
      username: String,
      firstName: String,
      lastName: String,
      profileImagePath: String,
      hourlyRate: Number,
      location: String,
      notification: Array,
      accountType: String,
      bookings: Array
    },
    { timestamps: true }
  )
)

module.exports = {
  UserSchema
}
