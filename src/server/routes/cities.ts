import { Router } from "express";
import { CitiesController } from "../controllers";

const CitiesRoute = Router();

CitiesRoute.post('/cities', CitiesController.createValidation, CitiesController.create);

export{CitiesRoute};