const statuses = {
  500: 'Error. Please try again later.',
  404: 'Resource not found.',
  403: 'Provided token is incorrect.',
  400: 'The request is incorrect.',
  201: 'Resource created.',
  200: 'Request fulfilled successfully.',
};

const statusMaker = (status, result = {}) => {
  const message = (result.message || statuses[status] || '');
  const response = Object.assign({}, {
    message,
    result,
  });
  return response;
};

export const serverError = statusMaker(500);
export const resourceNotFound = statusMaker(404);
export const authFailure = statusMaker(403);
export const missingParams = statusMaker(400);
export const resourceCreated = statusMaker(201);
export const successfulAction = statusMaker(200);

export default statusMaker;
