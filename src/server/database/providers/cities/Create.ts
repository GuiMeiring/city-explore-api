import { ApiError, BadRequestError, InternalServerError } from '../../../shared/helpers';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';

export const create = async(city: Omit<ICity, 'id_city'| 'createdAt' | 'updatedAt'>): Promise<number | ApiError > => {
  try {
    const verification = await Knex(ETableNames.city)
      .select('*') 
      .where('name', '=', city.name)
      .first();

    if (verification) return new BadRequestError('0003','City already exists', {}, { 'city_id': verification.id_city});

    const date = new Date();

    const [result] = await Knex(ETableNames.city).insert({...city, updatedAt: date, createdAt: date});

    if(typeof result === 'number') return result;

    return new InternalServerError('Error when create City');
        
  } catch (error) {
    console.log(error);
    return new InternalServerError('Error when create City', error);
  }
};
