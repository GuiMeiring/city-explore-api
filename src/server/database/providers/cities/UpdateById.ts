import { ApiError, BadRequestError, InternalServerError, NotFoundError } from "../../../shared/helpers";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const updateById = async(city: Omit<ICity, 'id_city' | 'updatedAt' | 'createdAt'>, id_city: number): Promise<void | ApiError> =>{

  try {

    const verification = await Knex(ETableNames.city)
    .select('*')
    .where('id_city','=', id_city)
    .first();

    if(!verification) return new NotFoundError('0001', 'This City doesnt exists');

    const verificationName = await Knex(ETableNames.city)
    .select('*')
    .where('name', '=', city.name)
    .first();

    if(verificationName) return new BadRequestError('0003', 'There is already a city with that name', {}, {'id_city': verificationName.id_city})

    const result = await Knex(ETableNames.city)
    .update({...city, updatedAt: new Date() })
    .where('id_city', '=', id_city);

    if(result) return;

    return new InternalServerError('Error when update City');
        
  } catch (error) {
    console.log(error);
    return new InternalServerError('Error when update City', error);
        
  }

};
