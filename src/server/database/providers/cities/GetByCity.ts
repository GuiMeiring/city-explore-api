import { ApiError, InternalServerError, NotFoundError } from "../../../shared/helpers";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const getById = async (name: string| undefined, id_city: number| undefined): Promise<ICity | ApiError> => {
  try {
    const query = Knex(ETableNames.city).select('*');
    if (id_city){
      query.where('id_city', '=', id_city);
    }
    if (name) {
      query.orWhere('name', '=', name);
    }

    const cityData = await query.first();

    if (cityData) {
      return cityData;
    }
  
    return new NotFoundError('0001', 'This City doesn\'t exist');
  } catch (error) {
    console.error(error);
    return new InternalServerError('Error when getting City', error);
  }
};
