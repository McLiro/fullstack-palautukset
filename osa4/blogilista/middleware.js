const jwt = require('jsonwebtoken')
const User = require('./models/user')

const extractToken = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  req.user = await User.findById(decodedToken.id)
  if (!req.user) {
    return res.status(401).json({ error: 'user not found' })
  }

  next()
}

module.exports = { extractToken, userExtractor }
