import jwt from 'jsonwebtoken';

export const verify = (token, secret, options) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    })
  );
