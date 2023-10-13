import { Router } from "express";
import { CitiesController } from "../controllers";

const CitiesRoute = Router();

CitiesRoute.post('/cities', CitiesController.create);

export{CitiesRoute};