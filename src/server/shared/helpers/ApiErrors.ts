export class ApiError extends Error {
    public readonly httpError: number;
    public readonly apiErrorCode: string;
    public readonly aditionalObject: unknown;
    public readonly customHeader?: { [key: string]: number };
    
    constructor(apiErrorCode: string, message: string, httpError: number, error: unknown,  customHeader?: { [key: string]: number } ) {
      super(message);
      this.httpError = httpError;
      this.apiErrorCode = apiErrorCode;
      this.aditionalObject = error;
      this.customHeader = customHeader;
    }
  }
    
  export class BadRequestError extends ApiError {
    constructor(apiErrorCode: string, message: string, aditionalObject?:unknown, customHeader?: { [key: string]: number }) {
      super(apiErrorCode, message, 400, aditionalObject, customHeader);
    }
  }
    
  export class NotFoundError extends ApiError {
    constructor(apiErrorCode: string, message: string, aditionalObject?:unknown, customHeader?: { [key: string]: number }) {
      super(apiErrorCode, message, 404, aditionalObject, customHeader);
    }
  }
    
  export class UnauthorizedError extends ApiError {
    constructor(apiErrorCode: string, message: string, aditionalObject?: unknown, customHeader?: { [key: string]: number }) {
      super(apiErrorCode, message, 401, aditionalObject, customHeader);
    }
  }
    
  export class InternalServerError extends ApiError {
    constructor(message: string, aditionalObject?: unknown, customHeader?: { [key: string]: number }) {
      super('9999', message, 500, aditionalObject, customHeader);
    }
  }
  
  interface ErrorObject {
    codeError: string;
    descError: string;
  }
    
  const errors: ErrorObject[] = [];
    
  const addError = (code: string, desc: string): void => {
    const obj: ErrorObject = {
      codeError: code,
      descError: desc
    };
  
    errors.push(obj);
  };
    
  const getApiErrorCode = (error: string): ErrorObject | undefined => {
    if (!error) {
      return undefined;
    }
    
    return errors.find((element) => element.codeError === error);
  };
    
  addError('0001', 'This object doesn\'t exist in the database');
  addError('0002', 'JSON with invalid fields / without required fields / with invalid values');
  addError('0003', 'Already exists');
  addError('0004', 'The specified city was not found')
  addError('9999', 'Internal Server Error');
    
  export { getApiErrorCode };