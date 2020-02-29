const Sequelize = require('sequelize')

const handleError = ({ res, error }) => {
  if (error instanceof Sequelize.UniqueConstraintError) {
    res.status(500).json({
      error: error.errors[0]
    })
  } else {
    res.status(500).json({
      error
    })
  }
}

module.exports = {
  handleError
}
