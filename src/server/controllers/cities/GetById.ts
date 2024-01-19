import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CitiesProvider } from '../../database/providers';
import { ApiError, BadRequestError } from '../../shared/helpers';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';

export interface IParamsProps {
  id_city?: number
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id_city: yup.number().required().moreThan(0)
    })
  )
}));
  
export const getById =async (req: Request<IParamsProps>, res: Response) => {

  if(!req.params.id_city) throw new BadRequestError('0002','id is required');

  const result= await CitiesProvider.getById(req.params.id_city);
  if(result instanceof ApiError) throw result;
  
  res.status(StatusCodes.OK).json(result);
    
};
