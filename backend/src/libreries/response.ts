import { Response } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';

export const createResponse = (apiResponse: Partial<ApiResponse>) => {
  const defaultResponse: ApiResponse = {
    code: 100,
    httpStatusCode: 200,
    message: '',
    status: true,
  };

  return { ...defaultResponse, ...apiResponse };
};

export const createErrorResponse = (apiResponse: Partial<ApiResponse>) => {
  const defaultResponse: ApiResponse = {
    code: 102,
    httpStatusCode: 500,
    message: '',
    status: false,
  };

  return { ...defaultResponse, ...apiResponse };
};

export const controllerResponse = (apiResponse: ApiResponse, res: Response) => {
  const exceptHttpStatusCodeResponse = { ...apiResponse };
  delete exceptHttpStatusCodeResponse.httpStatusCode;
  return res
    .status(apiResponse.httpStatusCode)
    .json(exceptHttpStatusCodeResponse);
};
