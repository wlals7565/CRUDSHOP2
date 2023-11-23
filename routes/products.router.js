const express = require('express')
const {
  getProducts,
  getProductDetail,
  postProduct,
  patchProduct,
  deleteProduct,
} = require('../controllers/products')
const { verifyToken } = require('../middlewares')

const router = express.Router()

//라우터 설정
router.get('/all', getProducts)

router.get('/:id', getProductDetail)

router.post('/', verifyToken, postProduct)

router.patch('/:id', verifyToken, patchProduct)

router.delete('/:id', verifyToken, deleteProduct)

module.exports = router
