import { NextFunction, Request, Response } from 'express';
import { ApiError, getApiErrorCode } from '../helpers/ApiErrors';

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const httpError = error.httpError ?? 500;
  const message = error.httpError ? error.message : 'Internal Server Error';
  const apiErrorCode = error.apiErrorCode !== undefined ? error.apiErrorCode : '9999';
  const additionalObject = error.aditionalObject ? error.aditionalObject : '{}';
  const custonHeader = error.customHeader;
  const ObjectApi = getApiErrorCode(apiErrorCode);
  const descError = ObjectApi?.descError;
  // Criar um objeto com as informações de erro
  const errorResponse = {
    apiErrorCode,
    descError,
    message,
    httpError,
    additionalObject,
  };

  return res.status(httpError).header(custonHeader).json(errorResponse);

  next();
};
