import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { CitiesProvider } from "../../database/providers";
import { ICity } from "../../database/models/City";
import { ApiError } from "../../shared/helpers";

interface IBodyProps extends Omit<ICity, 'id' | 'updatedAt'| 'createdAt'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(1).max(30)
    })
  )
}));

export const create = async (req: Request<Record<string, unknown>, Record<string, unknown>, IBodyProps>, res: Response) => {
  const result = await CitiesProvider.create(req.body);
  console.log(result);
  if (result instanceof ApiError) {
    throw result;
  }

  res.status(StatusCodes.OK).json({ status: 'ok', id: result });
};
