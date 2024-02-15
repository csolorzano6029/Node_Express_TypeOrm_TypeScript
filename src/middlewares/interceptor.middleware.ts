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

  res.send = function (body: any): Response<any, Record<string, any>> {
    if (!res.modifiedResponse) {
      const message = getMessage(req, res);
      const modifiedBody = {
        statusCode,
        message,
        data: body,
      };

      console.log('Intercepted response.send():', body);
      console.log('Intercepted response.send():', modifiedBody);
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
      default:
        message = 'Success';
    }
  }

  return message;
};
