import { ApiError, BadRequestError, InternalServerError, NotFoundError } from "../../../shared/helpers";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const updateById = async(city: Omit<ICity, 'id' | 'updatedAt' | 'createdAt'>, id: number): Promise<void | ApiError> =>{

  try {

    const verification = await Knex(ETableNames.city)
    .select('*')
    .where('id','=', id)
    .first();

    if(!verification) return new NotFoundError('0001', 'This City doesnt exists');

    const verificationName = await Knex(ETableNames.city)
    .select('*')
    .where('name', '=', city.name)
    .first();

    if(verificationName) return new BadRequestError('0003', 'There is already a city with that name', {}, {'city_id': verificationName.id})

    const result = await Knex(ETableNames.city)
    .update({name: city.name, updatedAt: new Date() })
    .where('id', '=', id);

    if(result) return;

    return new InternalServerError('Error when update City');
        
  } catch (error) {
    console.log(error);
    return new InternalServerError('Error when update City', error);
        
  }

};
