import { Request, Response} from "express";
import { ICity } from "../../database/models";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { ApiError, BadRequestError } from "../../shared/helpers";
import { CitiesProvider } from "../../database/providers";

export interface IBodyProps extends Omit<ICity, 'id' | 'updatedAt' | 'createdAt'> {};

export interface IParamsProps {
  id?: number
}

export const validationUpdateByID =  validation((getSchema) => ({
  body:getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(1).max(30)
    })
  ),
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().required().moreThan(0)
    })
  )
}));

export const updateById =async (req: Request<IParamsProps,{},IBodyProps>, res: Response) => {

  if(!req.params.id) throw new BadRequestError('0002', 'id is required');
    
  const result = await CitiesProvider.updateById(req.body, req.params.id);
  if(result instanceof ApiError) throw result;

  res.status(StatusCodes.OK).json({'status': 'OK'})
    
};
