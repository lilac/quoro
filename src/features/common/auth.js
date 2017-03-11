import { verify } from './promise-jwt';
import db from '../../db';
import resSender from './res-sender';
import { authFailure } from './responses-with-status';

export default (req, res, next) => {
  const token = req.body.token || req.query.token;

  if (token) {
    return verify(token, process.env.SECRET)
      .then(({ login }) => db.findUser(login))
      .then((user) => {
        if (!user) {
          return resSender(res, authFailure);
        }
        Object.assign(req, {
          user,
        });
        return next();
      })
      .catch(() => resSender(res, authFailure));
  }

  return resSender(res, authFailure);
};
