import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CitiesProvider } from '../../database/providers';
import { ApiError, BadRequestError } from '../../shared/helpers';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { getTouristSpotsCity, getWeatherCity } from '../../shared/services';

export interface IQueryProps {
  name?: string,
  id_city?: number
}

export const getByCityValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      name: yup.string().min(1).max(250),
      id_city: yup.number().moreThan(0)
    })

  )
}))

export const getByCity = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  const result = await CitiesProvider.getById(req.query.name || undefined, req.query.id_city || undefined);
  if (result instanceof ApiError) throw result;

  const weatherCity = await getWeatherCity(result.name);
  if(weatherCity instanceof ApiError) throw weatherCity;

  const touristSpotsCity = await getTouristSpotsCity(result.lat, result.lng);
  if(touristSpotsCity instanceof ApiError) throw touristSpotsCity;


  res.status(StatusCodes.OK).json({info: result,weather: weatherCity, touristSpots: touristSpotsCity});

};
