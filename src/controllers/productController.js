import productService from "../services/productService";

const handleGetAllCoffee = async (req, res) => {
  let products = await productService.getAllProductService('coffee')

  return res.status(200).json({
    errCode: 0,
    errMessage: 'OK',
    products
  })
}

const handleGetAllApparel = async (req, res) => {
  let products = await productService.getAllProductService('apparel')

  return res.status(200).json({
    errCode: 0,
    errMessage: 'OK',
    products
  })
}

const handleCreateProduct = async (req, res) => {
  const data = req.body;
  const message = await productService.createProduct(data)
  return res.status(200).json(message)
}

export default {
  handleGetAllCoffee,
  handleGetAllApparel,
  handleCreateProduct
}