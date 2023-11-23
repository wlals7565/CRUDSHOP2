const express = require('express')
const { verifyToken } = require('../middlewares')
const { join, login, getMyInfo } = require('../controllers/auth')

const router = express.Router()

router.post('/join', join)

router.post('/login', login)

router.get('/myInfo', verifyToken, getMyInfo)

module.exports = router
