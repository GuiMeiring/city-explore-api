import { Router } from "express";
import { CitiesController } from "../controllers";
import { resolver } from "../shared/helpers";

const CitiesRoute = Router();

CitiesRoute.post('/cities', CitiesController.createValidation, resolver(CitiesController.create));
CitiesRoute.get('/cities', resolver(CitiesController.getAll));
CitiesRoute.get('/cities/:id_city', CitiesController.getByIdValidation, resolver(CitiesController.getById));
CitiesRoute.put('/cities/:id_city', CitiesController.validationUpdateByID, resolver(CitiesController.updateById));
CitiesRoute.delete('/cities/:id_city', CitiesController.validatioDeleteById, resolver(CitiesController.deleteById));

export{CitiesRoute};