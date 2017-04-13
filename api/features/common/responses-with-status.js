import isObject from './is-object';

const statuses = {
  500: 'Error. Please try again later.',
  404: 'Resource not found.',
  403: 'Provided token is incorrect.',
  400: 'The request is incorrect.',
  201: 'Resource created.',
  200: 'Request fulfilled successfully.',
};

const statusCreator = status => (result = null) => {
  const msg = isObject(result) ? result.message : undefined;
  const message = (msg || statuses[status] || '');
  const response = Object.assign({}, {
    status,
    result,
    message,
  });
  return response;
};

export const serverError = statusCreator(500);
export const resourceNotFound = statusCreator(404);
export const authFailure = statusCreator(403);
export const missingParams = statusCreator(400);
export const resourceCreated = statusCreator(201);
export const successfulAction = statusCreator(200);

export default statusCreator;
