import { ApiError, InternalServerError, NotFoundError } from "../../../shared/helpers";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById =async (id:number): Promise<void | ApiError> => {

  try {

    const verification = await Knex(ETableNames.city)
    .select('*')
    .where('id', '=', id)
    .first();
    if(!verification) return new NotFoundError('0001', 'This City doenst exists');

    const result = await Knex(ETableNames.city)
    .del()
    .where('id','=', id);

    if(result) return;

    return new InternalServerError('Error when delete City');
        
  } catch (error) {
    console.log(error);
    return new InternalServerError('Error when delete City', error);
        
  }
    
};
