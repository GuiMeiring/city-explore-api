import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from "../../models/City"

export const create = async(city: Omit<ICity, 'id'| 'createdAt' | 'updatedAt'>): Promise<number | string | unknown> => {

  try {

    const verification = await Knex(ETableNames.city)
      .select('*') 
      .where('name', '=', city.name)
      .first();
    if (verification) return  'Cidade já exite';


    const date = new Date();

    const [result] = await Knex(ETableNames.city).insert({name: city.name, updatedAt: date, createdAt: date});

    if(typeof result === 'number') return result;

    return 'Erro ao criar Cidade';
        
  } catch (error) {
    return error;
  }

};
