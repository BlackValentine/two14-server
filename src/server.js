import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB'
import cors from 'cors';
import cookieParser from 'cookie-parser';
require('dotenv').config();

let app = express();
const frontEndPort = process.env.FE_PORT;
const corsOptions ={
  origin: `http://localhost:${frontEndPort}`, 
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '200mb' }));

app.use(bodyParser.urlencoded({limit: '200mb', extended: true}))

app.use(cookieParser())

configViewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8888;

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(port, () => {
  console.log(`Server running on port : ${port}`)
})