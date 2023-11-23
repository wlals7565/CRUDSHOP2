const { Product, User } = require('../models')

//상품 목록 조회 0
exports.getProducts = async (req, res, next) => {
  let sortMethod = 'DESC'
  if (req.query.sort) {
    sortMethod = req.query.sort
  }
  try {
    const results = await Product.findAll({
      attributes: ['id', 'productName', 'content', 'isSoldout', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['nick', 'email'],
        },
      ],
      order: [['createdAt', sortMethod]],
    })
    res.json({ results })
    return
  } catch (error) {
    console.error(error)
    next(error)
  }
}
//상품 상세 조회 0
exports.getProductDetail = async (req, res, next) => {
  const productId = req.params.id
  try {
    const result = await Product.findOne({
      attributes: ['id', 'productName', 'content', 'isSoldout', 'createdAt'],
      where: { id: productId },
      include: [
        {
          model: User,
          attributes: ['nick', 'email'],
        },
      ],
    })
    if(!result){
      res.status(400).json({
        code: 400,
        message: "해당 상품이 존재하지 않습니다."
      })
      return
    }
    res.json({ result })
    return
  } catch (error) {
    console.error(error)
    next(error)
  }
}

//상품 작성 체크할 것 0
exports.postProduct = async (req, res, next) => {
  const { productName, content } = req.body
  try {
    if (!productName || !content) {
      res.status(400).json({
        code: 400,
        message: '요청 본문이 잘못되었습니다.',
      })
      return
    }
    const newProduct = await Product.create({
      productName,
      content,
    })
    const user = await User.findOne({ where: { id: res.locals.user.id } })
    await user.addProduct(newProduct)
    res.json({
      code: 200,
      message: '상품 등록에 성공하셨습니다.',
    })
    return
  } catch (error) {
    console.error(error)
    next(error)
  }
}
//상품 수정
exports.patchProduct = async (req, res, next) => {
  const productId = req.params.id
  const updatedData = {
    isSoldout: req.body.isSoldout,
    productName: req.body.productName,
    content: req.body.content,
  }
  try {
    const product = await Product.findOne({
      where: {id: productId},
    })

    if(!product){
      res.status(400).json({
        code: 400,
        message: "상품 조회에 실패했습니다."
      })
      return
    }

    if(product.author !== res.locals.user.id){
      res.status(400).json({
        code: 400,
        message: "해당 상품을 수정할 권한이 없습니다"
      })
      return
    }

    await product.update(updatedData)
    res.json({
      code:200,
      message: "상품을 성공적으로 수정하였습니다."
    })
    return
  } catch (error) {
    console.error(error)
    next(error)
  }
}
//상품 삭제
exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.id
  try{
    const product = await Product.findOne({
      where: {id: productId},
    })

    if(!product){
      res.status(400).json({
        code: 400,
        message: "상품 조회에 실패했습니다."
      })
      return
    }

    if(product.author !== res.locals.user.id){
      res.status(400).json({
        code: 400,
        message: "해당 상품을 삭제할 권한이 없습니다"
      })
      return
    }

    await product.destroy();
    res.json({
      code: 200,
      message: "상품을 성공적으로 삭제하였습니다."
    })
  }
  catch(error){
    console.error(error)
    next(error)
  }
}
