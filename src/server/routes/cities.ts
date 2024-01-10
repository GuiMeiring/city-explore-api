import { Router } from "express";
import { CitiesController } from "../controllers";
import { resolver } from "../shared/helpers";

const CitiesRoute = Router();

CitiesRoute.post('/cities', CitiesController.createValidation, resolver(CitiesController.create));
CitiesRoute.get('/cities', resolver(CitiesController.getAll));
CitiesRoute.get('/cities/:id', CitiesController.getByIdValidation, resolver(CitiesController.getById));

export{CitiesRoute};