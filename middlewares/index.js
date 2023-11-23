const jwt = require('jsonwebtoken')
exports.verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).json({
        code: 400,
        message: 'authorization토큰을 담은 헤더가 없습니다. ',
      })
      return
    }
    const [tokenType, token] = req.headers.authorization.split(' ')
    if (tokenType != 'Bearer') {
      res.status(400).json({
        code: 400,
        message:
          'authorization토큰의 타입이 잘못되었습니다. Bearer <JWT Value>형식으로 입력해주세요',
      })
      return
    }
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
    return
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다. 로그인을 통해 토큰을 재발급 해주세요.',
      })
      return
    }
    res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.',
    })
  }
}
