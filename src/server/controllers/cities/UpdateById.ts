import { Request, Response} from "express";
import { ICity } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { ApiError, BadRequestError } from "../../shared/helpers";
import { CitiesProvider } from "../../database/providers";

export interface IBodyProps extends Omit<ICity, 'id_city' | 'updatedAt' | 'createdAt'> {};

export interface IParamsProps {
  id_city?: number
}

export const validationUpdateByID =  validation((getSchema) => ({
  body:getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(1).max(150),
      estate: yup.string().min(1).max(50),
      country: yup.string().required().min(1).max(50),
      lat: yup.number().required(),
      lng: yup.number().required()
    })
  ),
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id_city: yup.number().required().moreThan(0)
    })
  )
}));

export const updateById =async (req: Request<IParamsProps,{},IBodyProps>, res: Response) => {

  if(!req.params.id_city) throw new BadRequestError('0002', 'id is required');
    
  const result = await CitiesProvider.updateById(req.body, req.params.id_city);
  if(result instanceof ApiError) throw result;

  res.status(StatusCodes.OK).json({'status': 'OK'})
    
};
