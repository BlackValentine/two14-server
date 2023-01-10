import express from 'express';
import homeController from "../controllers/homeController"
import productController from '../controllers/productController';

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/api/home/get-alluser', homeController.getAllUser)

  router.get('/api/coffee/get-products', productController.handleGetProducts)
  router.post('/api/product/create-product', productController.handleCreateProduct)
  return app.use('/', router);
}

export default initWebRoutes;