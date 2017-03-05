import { verify } from './promise-jwt';
import db from '../../db';
import resSender from './resSender';

const invalidTokenResponse = { status: 403, message: 'Provided token is incorrect.' };
const serverErrorResponse = { status: 500, message: 'Error. Please try again later.' };

export default (req, res, next) => {
  const token = req.body.token || req.query.token;

  if (token) {
    return verify(token, process.env.SECRET)
      .then(({ login }) => db.findUser(login))
      .then((user) => {
        if (!user) {
          return resSender(res, serverErrorResponse);
        }
        Object.assign(req, {
          user,
        });
        return next();
      })
      .catch(() => resSender(res, serverErrorResponse));
  }

  return resSender(res, invalidTokenResponse);
};
