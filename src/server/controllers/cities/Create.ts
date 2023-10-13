import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

interface ICity {
    name:string
}

export const create = async(req:Request<{},{},ICity>, res:Response) =>{

    res.status(StatusCodes.CREATED).json({'status':'ok', 'name': req.body.name})
}