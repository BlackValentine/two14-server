import express from 'express';
import homeController from "../controllers/homeController"

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/api/home/get-alluser', homeController.getAllUser)
  return app.use('/', router);
}

export default initWebRoutes;