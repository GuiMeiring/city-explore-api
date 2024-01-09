import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { CitiesProvider } from "../../database/providers";
import { ICity } from "../../database/models/City";

interface IBodyProps extends Omit<ICity, 'id' | 'updatedAt'| 'createdAt'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
      yup.object().shape({
        name: yup.string().required().min(1).max(30)
      })
    )
  }));

export const create = async(req:Request<{},{},IBodyProps>, res:Response) =>{

  try {
    const result = await CitiesProvider.create(req.body);
    if (typeof result === 'string'){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({'error' : result});
    }

    return res.status(StatusCodes.CREATED).json({'status':'ok', 'id': result});

  }catch(error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('error: Não foi possivel criar a cidade')

  }
};
