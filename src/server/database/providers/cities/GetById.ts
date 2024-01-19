import { ApiError, InternalServerError, NotFoundError } from "../../../shared/helpers";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const getById =async (id_city: number): Promise<ICity | ApiError> => {

  try {
    const result = await Knex(ETableNames.city)
      .select('*')
      .where('id_city','=',id_city)
      .first();

    if(result) return result;

    return new NotFoundError('0001', 'This City doenst exists');
        
    } catch (error) {
      console.log(error);
      return new InternalServerError('Error when get City', error)     
    }  
};
