import { Router } from "express";
import { CitiesController } from "../controllers";
import { resolver } from "../shared/helpers";

const CitiesRoute = Router();

CitiesRoute.post('/cities', CitiesController.createValidation, resolver(CitiesController.create));

export{CitiesRoute};