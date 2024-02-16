import { Request, Response, NextFunction } from 'express';

// Definir una interfaz extendida para Response

interface CustomResponse extends Response {
  modifiedResponse?: boolean;
}

export const responseInterceptor = (
  req: Request,
  res: CustomResponse,
  next: NextFunction,
) => {
  const originalSend = res.send;
  const originalJson = res.json;
  const statusCode = res.statusCode;
  console.log(res.statusCode);

  res.send = function (body: any): Response<any, Record<string, any>> {
    if (!res.modifiedResponse) {
      const message = getMessage(req, res);
      const modifiedBody = {
        statusCode,
        message,
        data: body,
      };

      res.modifiedResponse = true;
      return originalSend.call(this, modifiedBody);
    } else {
      return originalSend.call(this, body);
    }
  };

  res.json = function (body: any): Response<any, Record<string, any>> {
    if (!res.modifiedResponse) {
      const message = getMessage(req, res);
      const modifiedBodyJson = {
        statusCode,
        message,
        data: body,
      };

      res.modifiedResponse = true;
      return originalJson.call(this, modifiedBodyJson);
    } else {
      return originalJson.call(this, body);
    }
  };

  next();
};

export const errorInterceptor = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error occurred:', err.message);

  // Formatear el error como desees
  const errorResponse = {
    error: err.message,
    name: err.name,
  };

  // Enviar el error de vuelta al cliente
  res.status(500).json(errorResponse);
};

export const handleAsyncError = (handler: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.log(res.statusCode);
      next(error); // Pasar el error al siguiente middleware de manejo de errores
    }
  };
};

const getMessage = (req: Request, res: CustomResponse): string => {
  const response = res.locals.response;
  let message: string;

  if (response && response.message) {
    message = response.message;
  } else {
    switch (req.method) {
      case 'POST':
        message = 'Created';
        break;
      case 'PUT':
      case 'PATCH':
        message = 'Updated';
        break;
      case 'DELETE':
        message = 'Deleted';
        break;
      case 'GET':
        message = 'Success';
        break;
      default:
        message = 'Error';
    }
  }

  return message;
};
