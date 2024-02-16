import { Router } from "express";
import { CitiesController } from "../controllers";
import { resolver } from "../shared/helpers";


const CitiesRoute = Router();

CitiesRoute.post('/cities', CitiesController.createValidation, resolver(CitiesController.create));
CitiesRoute.get('/cities', resolver(CitiesController.getAll));
CitiesRoute.get('cities/city', CitiesController.getByCityValidation, resolver(CitiesController.getByCity));
CitiesRoute.put('/cities/:id_city', CitiesController.validationUpdateByID, resolver(CitiesController.updateById));
CitiesRoute.delete('/cities/:id_city', CitiesController.validatioDeleteById, resolver(CitiesController.deleteById));
CitiesRoute.get('/cities/search', CitiesController.seachCityValidation, resolver(CitiesController.searchCity));

export{CitiesRoute};