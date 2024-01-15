import { Router } from "express";
import { CitiesController } from "../controllers";
import { resolver } from "../shared/helpers";

const CitiesRoute = Router();

CitiesRoute.post('/cities', CitiesController.createValidation, resolver(CitiesController.create));
CitiesRoute.get('/cities', resolver(CitiesController.getAll));
CitiesRoute.get('/cities/:id', CitiesController.getByIdValidation, resolver(CitiesController.getById));
CitiesRoute.put('/cities/:id', CitiesController.validationUpdateByID, resolver(CitiesController.updateById));
CitiesRoute.delete('/cities/:id', CitiesController.validatioDeleteById, resolver(CitiesController.deleteById));
CitiesRoute.get('/cities_weather', CitiesController.getWheather);
CitiesRoute.get('/cities_coordenadas', CitiesController.getoordenadas);
CitiesRoute.get('/cities_pontos', CitiesController.getpontos);
CitiesRoute.get('/cities_info', CitiesController.getCityInfo);

export{CitiesRoute};