import { ApiError, InternalServerError } from "../../../shared/helpers"
import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { ICity } from "../../models"

export const getAll = async (page: number, limit: number, filter: string, id_city = 0): Promise<ICity[] | ApiError> => {

  try {
    const result = await Knex(ETableNames.city)
      .select('*')
      .where('id_city', Number(id_city))
      .orWhere('name', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id_city > 0 && result.every(item => item.id_city !== id_city)) {
      const resultById = await Knex(ETableNames.city)
        .select('*')
        .where('id_city', '=', id_city)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new InternalServerError('Error when get all Cities', error);
  } 
};
