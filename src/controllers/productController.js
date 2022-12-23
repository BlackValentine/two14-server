import productService from "../services/productService";

const handleCreateProduct = async (req, res) => {
  const data = req.body;
  const message = await productService.createProduct(data)
  return res.status(200).json(message)
}

export default {
  handleCreateProduct
}