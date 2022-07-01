const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json("Нет доступа(no authorization header)")
  }

  const [type, token] = authorization.split(" ")

  if (type !== "Bearer") {
    return res.status(401).json("неверный тип токен")
  }

  try {
    req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY)

    next()
  } catch (e) {
    return res.status(401).json("Ошибка авторизации" + e.toString())
  }
}
