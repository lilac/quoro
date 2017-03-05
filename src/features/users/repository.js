import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import db from '../../db';

const missingParamResponse = { status: 400, message: 'Missing data.' };
const serverErrorResponse = { status: 500, message: 'Error. Please try again later.' };

export const create = (username, login, password, email) => {
  if (!username || !login || !password || !email) {
    return Promise.resolve(missingParamResponse);
  }

  const hash = bcrypt.hashSync(password);

  return db.findUser(login).then(
    (user) => {
      if (user) {
        return { status: 400, message: 'User with provided login already exists.' };
      }
      return db.createUser(username, login, hash, email)
        .then(() => ({ status: 201, message: 'User created.' }));
    }
  )
  .catch(() => serverErrorResponse);
};

export const authenticate = (reqLogin, reqPassword) => {
  if (!reqLogin || !reqPassword) {
    return Promise.resolve(missingParamResponse);
  }
  return db.findUser(reqLogin)
    .then(({ login, id, password, username }) => {
      if (bcrypt.compareSync(reqPassword, password)) {
        const token = jwt.sign({ id, login }, process.env.SECRET, {
          expiresIn: '2h',
        });
        return { status: 201, message: 'User logged in.', login, token, username };
      }
      return { status: 400, message: 'The password is incorrect.' };
    })
    .catch(() => serverErrorResponse);
};

export const update = id =>
  db.updateUser(id)
    .then(() => ({ status: 200, message: 'User updated.' }))
    .catch(() => serverErrorResponse);

export const remove = id =>
  db.deleteUser(id)
    .then(() => ({ status: 200, message: 'User deleted.' }))
    .catch(() => serverErrorResponse);
