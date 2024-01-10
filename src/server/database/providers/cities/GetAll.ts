import { ApiError, InternalServerError } from "../../../shared/helpers"
import { ETableNames } from "../../ETableNames"
import { Knex } from "../../knex"
import { ICity } from "../../models"

export const getAll = async (): Promise<ICity[] | ApiError> => {

  try {
    const result = await Knex(ETableNames.city).select('*');
    return result;
        
  } catch (error) {
    console.log(error);
    return new InternalServerError('Error when get all Cities', error);
  } 
};
