import { ApiError, InternalServerError, NotFoundError } from "../../../shared/helpers";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const getById =async (id: number): Promise<ICity | ApiError> => {

  try {
    const result = await Knex(ETableNames.city)
      .select('*')
      .where('id','=',id)
      .first();

    if(result) return result;

    return new NotFoundError('0001', 'This City doenst exist');
        
    } catch (error) {
      console.log(error);
      return new InternalServerError('Error when get City', error)     
    }  
};
