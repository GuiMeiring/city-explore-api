import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CitiesProvider } from "../../database/providers";
import { ApiError } from "../../shared/helpers";
import yup from 'yup';
import { validation } from "../../shared/middleware";

interface IQueryProps {
    id_city?: number;
    page?: number;
    limit?: number;
    filter?: string;
}
export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().moreThan(0),
        limit: yup.number().moreThan(0),
        id_city: yup.number().integer().default(0),
        filter: yup.string(),
    })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

    const result = await CitiesProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '', Number(req.query.id_city || 0));
    if (result instanceof ApiError) throw result;
    const count = await CitiesProvider.count(req.query.filter);
    if (count instanceof ApiError) throw count;

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    res.status(StatusCodes.OK).json(result);

};
