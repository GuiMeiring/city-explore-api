import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';

interface IBodyProps {
    name:string
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
      yup.object().shape({
        name: yup.string().required().min(1).max(30)
      })
    )
  }));

export const create = async(req:Request<{},{},IBodyProps>, res:Response) =>{

    res.status(StatusCodes.CREATED).json({'status':'ok', 'name': req.body.name})
}