import productService from "../services/productService";

const handleGetProducts = async (req, res) => {
  const id = req.query.id;
  const type = req.query.type;

  if (!type) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing product type',
      products: []
    })
  } else {
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: 'Missing product id',
        products: []
      })
    }
  
    let products = await productService.getProducts(type, id)
    return res.status(200).json({
      errCode: 0,
      errMessage: 'OK',
      products
    })
  }
}

const handleCreateProduct = async (req, res) => {
  const data = req.body;
  const message = await productService.createProduct(data)
  return res.status(200).json(message)
}

export default {
  handleGetProducts,
  handleCreateProduct
}