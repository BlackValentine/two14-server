import express from 'express';
import homeController from "../controllers/homeController"
import productController from '../controllers/productController';
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/api/home/get-alluser', homeController.getAllUser)

  router.get('/api/get-all-coffee', productController.handleGetAllCoffee)
  router.get('/api/get-all-apparel', productController.handleGetAllApparel)
  router.post('/api/product/create-product', productController.handleCreateProduct)

  router.post('/api/user/create-user', userController.handleCreateUser)
  router.post('/api/user/login', userController.handleLoginController)
  return app.use('/', router);
}

export default initWebRoutes;