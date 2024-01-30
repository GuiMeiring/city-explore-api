import { Request, Response } from "express"
import { validation } from "../../shared/middleware";
import * as yup from 'yup';
import { getGecodingCity } from "../../shared/services";
import { ApiError, BadRequestError } from "../../shared/helpers";
import { StatusCodes } from "http-status-codes";

export interface IQueryProps {
    name?: string,
}

export const seachCityValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        yup.object().shape({
            name: yup.string().min(1).max(250).required(),
        })

    )
}))

export const searchCity =async (req: Request<{},{},{}, IQueryProps>, res: Response) => {

    if(!req.query.name) throw new BadRequestError('0002','name a is required')

    const geocodingCity = await getGecodingCity(req.query.name);
    if(geocodingCity instanceof ApiError) throw geocodingCity;

    res.status(StatusCodes.OK).json({name: req.query.name, geocoding: geocodingCity})

}