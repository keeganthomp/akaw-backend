const { UserSchema } = require('../schemas/userSchema')
const Users = UserSchema

initializeUserRoutes = ({ router }) => {
  router.get('/user/surfers/:user', (req, res) => {
    const { user } = req.params
    Users.find(
      {
        $and: [{ accountType: 'surfer' }, { username: { $ne: user } }]
      },
      (err, data) => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true, surfers: data })
      }
    )
  })

  router.get('/user/surfees', (req, res) => {
    Users.find({ accountType: 'surfee' }, (err, data) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true, surfees: data })
    })
  })

  router.get('/user/email/:email', (req, res) => {
    const { email } = req.params
    Users.findOne({ email }, (err, data) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true, user: data })
    })
  })

  router.get('/user/username/:username', (req, res) => {
    const { username } = req.params
    Users.findOne({ username }, (err, data) => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true, user: data })
    })
  })

  router.delete('/user', (req, res) => {
    const { id } = req.body
    Users.findByIdAndRemove(id, err => {
      if (err) return res.send(err)
      return res.json({ success: true })
    })
  })

  router.post('/user', (req, res) => {
    const User = new Users()
    const { username, email, accountType } = req.body
    if (!username || !email) {
      return res.json({
        success: false,
        error: 'INVALID INPUTS'
      })
    } else {
      User.username = username
      User.email = email
      User.accountType = accountType
      User.save(err => {
        if (err) return res.json({ success: false, error: err })
        return res.json({ success: true })
      })
    }
  })

  router.put('/user', (req, res) => {
    const { username, data } = req.body
    Users.findOneAndUpdate(
      { username },
      data,
      { upsert: true },
      (err, data) => {
        if (err) return res.send(500, { error: err })
        return res.send('Succesfully saved.')
      }
    )
  })
}

module.exports = {
  initializeUserRoutes
}
