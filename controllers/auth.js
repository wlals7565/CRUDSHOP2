const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.join = async (req, res) => {
  const { email, password, passwordConfirm, nick } = req.body
  try {
    if (!email || !password || !passwordConfirm || !nick) {
      res.status(400).json({ code: 400, message: '요청 본문이 잘못되었습니다.' })
      return
    }
    const exUser = await User.findOne({ where: { email } })
    if (exUser) {
      res
        .status(400)
        .json({ code: 400, message: '해당 이메일은 이미 가입되어 있습니다.' })
      return
    }
    if (password != passwordConfirm) {
      res.status(400).json({
        code: 400,
        message: '비밀번호가 일치하지 않습니다. 다시 확인해주세요.',
      })
      return
    }
    if (password.length < 6) {
      res.status(400).json({
        code: 400,
        message:
          '비밀번호가 너무 짧습니다. 6자 이상의 비밀번호를 입력해주세요.',
      })
      return
    }
    const hash = await bcrypt.hash(password, 12)
    await User.create({
      email,
      password: hash,
      nick,
    })
    res.json({
      email,
      nick,
    })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      res.status(400).json({ code: 400, message: '요청 본문이 잘못되었습니다.' })
      return
    }
    const exUser = await User.findOne({ where: { email } })
    if (!exUser) {
      res
        .status(400)
        .json({
          code: 400,
          message: '해당 이메일은 가입되어 있지 않은 이메일입니다',
        })
      return
    }
    const result = await bcrypt.compare(password, exUser.password)
    if (!result) {
      res
        .status(400)
        .json({ code: 400, message: '비밀번호가 일치하지 않습니다.' })
      return
    }
    const token = jwt.sign(
      {
        id: exUser.id,
        email: exUser.email,
        nick: exUser.nick,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '12h',
        issuer: 'IJH',
      },
    )
    res.json({
      code: 200,
      message: '성공적으로 로그인 하였습니다. 인증용 토큰이 발급됩니다.',
      token,
    })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

exports.getMyInfo = (req,res) => {
  res.json({
    code: 200,
    message: "내 정보 조회 결과입니다.",
    email: res.locals.user.email,
    nick: res.locals.user.nick
  })
}
