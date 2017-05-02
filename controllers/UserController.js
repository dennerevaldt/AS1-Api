const fs = require('fs')

function UserController () {

}

UserController.prototype.dataUserLogged = function (request, response, next) {
  const arrUsers = JSON.parse(fs.readFileSync('./appdata/users.json', 'utf8'));
  const user = arrUsers.find((item) => item.user_id === request.decoded.user_id)

  response.json({
    user: {
      user_id: user.user_id,
      name: user.name,
      email: user.email
    }
  })
}

module.exports = function () {
  return new UserController()
}
