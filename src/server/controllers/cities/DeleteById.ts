import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { ApiError, BadRequestError } from "../../shared/helpers";
import { CitiesProvider } from "../../database/providers";

export interface IParamsProps {
  id?: number;
}

export const validatioDeleteById = validation((getSchema) =>({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().required().moreThan(0)
    })
  )
}));

export const deleteById = async (req:Request<IParamsProps>, res: Response) => {

  if(!req.params.id) throw new BadRequestError('0001', 'id is required');

  const result = await CitiesProvider.deleteById(req.params.id);
  if(result instanceof ApiError) throw result;

  res.status(StatusCodes.OK).json({'status': 'ok'});
    
};
