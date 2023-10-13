import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;// vi pegar schema por schema deixano obrigatorio

type TAllSchemas = Record<TProperty, ObjectSchema<AnyObject>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {//middleware
  const schemas = getAllSchemas((schema) => schema);//o schemas vai pegar todos os schamas que é passado pra ele no controller 


  const errorsResult: Record<string, Record<string, string>> = {};// Vai guardar um objeto  dentro de uma string , pr exemplo body:{'name':'exemplo'}

  Object.entries(schemas).forEach(([key, schema]) => {//Vai transforma todos os schemas em um Array, validando um por um
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });//valida
    } catch (err) {
      const yupError = err as ValidationError;//caso deu erro vai guardar os erros
      const errors: Record<string, string> = {};//'name':'

      yupError.inner.forEach(error => {//passar erro por erro
        if (error.path === undefined) return;//vai para o proximo se não tiver erro
        errors[error.path] = error.message;//O caminho vai ser guardado na primeira string, o segundo a mensagem
      });

      errorsResult[key] = errors;//Guardar o erro na chave,  por exemplo body, params
    }
  });


  if (Object.entries(errorsResult).length === 0) {//Se não der nenhum erro de validação
    return next();// executar o proximo Handler da rota
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    
  }
};