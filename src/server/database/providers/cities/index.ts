import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetByCity';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as count from './Count';

export const CitiesProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById,
  ...count
};
