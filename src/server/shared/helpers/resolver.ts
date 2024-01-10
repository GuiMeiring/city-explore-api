import { Request, Response, NextFunction } from 'express';

export const resolver = (handlerFn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handlerFn(req, res, next))
      .catch(e => next(e));
  };
};

// Essa função resolver é uma função de ordem superior que recebe um handlerFn como parâmetro. 
// O handlerFn é uma função de manipulador assíncrona que recebe os objetos 
// req (Request), res (Response) e next (NextFunction) do Express.js e retorna uma promessa.


// a função resolver basicamente envolve uma função de manipulador assíncrona, garante que ela seja executada 
// corretamente como uma promessa e lida com erros lançados durante a execução do handlerFn chamando o 
// middleware next() com o erro.

// try {
//     throw new Error('');
// } catch (error) {
//     next(error);
    
// }