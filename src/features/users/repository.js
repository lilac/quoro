import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import db from '../../db';
import statusCreator, { serverError, missingParams, resourceCreated, successfulAction } from '../common/responses-with-status';
import parseQuestion from '../common/parse-question';

export const create = (username, login, password, email) => {
  if (!username || !login || !password || !email) {
    return Promise.resolve(missingParams);
  }

  const hash = bcrypt.hashSync(password);

  return db.findUser(login).then((user) => {
    if (user) {
      return statusCreator(400)({ message: 'User with provided login already exists.' });
    }
    return db.createUser(username, login, hash, email)
      .then(() => resourceCreated());
  })
  .catch(() => serverError());
};

export const authenticate = (reqLogin, reqPassword) => {
  if (!reqLogin || !reqPassword) {
    return Promise.resolve(missingParams());
  }
  return db.findUser(reqLogin)
    .then(({ login, id, password, username }) => {
      if (bcrypt.compareSync(reqPassword, password)) {
        const token = jwt.sign({ id, login }, process.env.SECRET, {
          expiresIn: '2h',
        });
        return successfulAction({ login, token, username, id });
      }
      return statusCreator(400)({ message: 'Password is incorrect.' });
    })
    .catch(() => serverError());
};

export const update = (id) => {
  if (!id) {
    return Promise.resolve(missingParams());
  }
  return db.updateUser(id)
    .then(() => successfulAction())
    .catch(() => serverError());
};

export const remove = (id) => {
  if (!id) {
    return Promise.resolve(missingParams());
  }

  return db.deleteUser(id)
    .then(() => successfulAction())
    .catch(() => serverError());
};

export const find = (id) => {
  if (!id) {
    return Promise.resolve(missingParams());
  }

  return db.findUserById(id)
    .then(user => successfulAction(user))
    .catch(() => serverError());
};

export const findQuestions = (id) => {
  if (!id) {
    return Promise.resolve(missingParams());
  }

  return db.findUsersQuestions(id)
    .then(questions => questions.map(question => parseQuestion(question)))
    .then(questions => successfulAction(questions))
    .catch(() => serverError());
};
