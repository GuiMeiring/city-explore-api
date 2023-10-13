import express from 'express';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import * as routes from './routes';
const server = express();

server.use(express.json()); //Server vai fazer o uso do json nas rotas que é enviado req no body

server.get('/', (req, res) =>{
    res.status(StatusCodes.OK).send('Hello Word');
})

const combinedRouter = express.Router()
  .use(routes.CitiesRoute);

server.use(combinedRouter);

export {server};