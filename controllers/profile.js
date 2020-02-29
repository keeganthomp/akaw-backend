const models = require('../models')
const { Profile, User } = models

const createOrUpdateProfile = async (req, res) => {
		const { userId, profile } = req.body
  try {
    const [returnedProfile, wasCreated] = await Profile.findOrCreate({
      where: {
        userId
      },
      include: [
        {
          model: User,
          as: 'user'
        }
      ]
    })
    const updatedProfile = await returnedProfile.update({
      ...profile
				})
    res.status(200).json({
      isNew: wasCreated,
      profile: updatedProfile
    })
  } catch (err) {
			console.log('Error creating or updating profile:', err)
    res.status(500).json({
      err
    })
  }
}

const getProfile = async (req, res) => {
  const { userId } = req.params
  try {
    const profile = await Profile.findOne({
      where: {
        userId
      },
    })
    res.status(200).json({
      profile
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}

module.exports = {
  createOrUpdateProfile,
  getProfile
}
