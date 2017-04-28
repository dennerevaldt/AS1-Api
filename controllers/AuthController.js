const jwt = require('jwt-simple')
const moment = require('moment')
const fs = require('fs')

function AuthController () {

}

AuthController.prototype.middlewareAuth = function (request, response, next) {
  const token = request.query.token || request.headers['x-access-token']
  if (!token) {
    const err = new Error('Forbidden')
    err.status = 403
    return next(err)
  }
  try {
    const decoded = jwt.decode(token, 'exerciseAsKey')
    const isExpired = moment(decoded.exp).isBefore(new Date())
    if (isExpired) {
      const err = new Error('Unauthorized')
      err.status = 401
      return next(err)
    } else {
      request.decoded = decoded
      next()
    }
  } catch (err) {
    return next(err)
  }
}

AuthController.prototype.token = function (request, response, next) {
  const username = request.body.username
  const password = request.body.password

  if (!username || !password) {
    const err = new Error('Bad request')
    err.status = 400
    return next(err)
  }

  const arrUsers = JSON.parse(fs.readFileSync('./appdata/users.json', 'utf8'));
  const user = arrUsers.find((item) => item.email === username && item.pwd === password)

  if (user) {
    const expires = moment().add(1, 'days').valueOf()
    const token = jwt.encode({
      user_id: user.user_id,
      username: user.username,
      exp: expires
    }, 'exerciseAsKey')
    response.json({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      token: token
    })
  } else {
    const err = new Error('Unauthorized')
    err.status = 401
    next(err)
  }
}

module.exports = function (UserModel) {
  return new AuthController(UserModel)
}
