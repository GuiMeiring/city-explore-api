import { ApiError, InternalServerError } from '../../../shared/helpers';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const count = async (filter = ''): Promise<number | ApiError> => {
  try {
    const [{ count }] = await Knex(ETableNames.city)
      .where('name', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new InternalServerError('Erro ao consultar a quantidade total de registros');
  } catch (error) {
    console.log(error);
    return new InternalServerError('Erro ao consultar a quantidade total de registros',error);
  }
};