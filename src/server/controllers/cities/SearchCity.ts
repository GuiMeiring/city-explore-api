import { Request, Response } from "express"
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { getCoordinateCity } from "../../shared/services";
import { ApiError, BadRequestError } from "../../shared/helpers";
import { StatusCodes } from "http-status-codes";

export interface IQueryProps {
    name?: string,
    estate?: string,
    country?: string
}

export const seachCityValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        yup.object().shape({
            name: yup.string().min(1).max(250).required(),
            estate: yup.string().min(1).max(50),
            country: yup.string().min(1).max(50).required()
        })

    )
}))

export const searchCity =async (req: Request<{},{},{}, IQueryProps>, res: Response) => {

    const name = req.query.name;
    const estate = req.query.estate;
    const country = req.query.country;

    if(!name) throw new BadRequestError('0002','name and country is required')

    const coordinate_city = await getCoordinateCity(name);
    if(coordinate_city instanceof ApiError) throw coordinate_city;

    res.status(StatusCodes.OK).json({coordinate_city})

    
}