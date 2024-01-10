import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CitiesProvider } from "../../database/providers";
import { ApiError } from "../../shared/helpers";

export const getAll =async (req: Request, res: Response) => {

    const result = await CitiesProvider.getAll();
    if(result instanceof ApiError) throw result;

    res.status(StatusCodes.OK).json(result);
    
};
