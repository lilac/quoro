import db from '../../db';
import { serverError, missingParams, successfulAction, resourceNotFound } from '../common/responses-with-status';
import parseQuestion from '../common/parse-question';

export const find = (id) => {
  if (!id) {
    return Promise.resolve(missingParams());
  }

  return db.findQuestion(id)
    .then((result) => {
      if (!result) {
        return resourceNotFound();
      }

      const question = parseQuestion(result);
      return successfulAction(question);
    })
    .catch(() => serverError);
};

export const create = (title, content, image, userId, categoryId) => {
  if (!title || !content || !image || !userId || !categoryId) {
    return Promise.resolve(missingParams());
  }

  return db.createQuestion(title, content, image, userId, categoryId)
    .then(() => {
      global.socket.emit('ADD_QUESTION');
      return successfulAction();
    })
    .catch(() => serverError());
};

export const findLast = (amount) => {
  if (!amount) {
    return Promise.resolve(missingParams());
  }
  return db.findLastQuestions(amount)
    .then(results => results.map(question => parseQuestion(question)))
    .then(questions => successfulAction(questions))
    .catch(() => serverError());
};

export const findWithQuery = (query) => {
  if (!query) {
    return Promise.resolve(missingParams());
  }

  return db.findQuestionsWithQuery(query)
    .then(questions => questions.map(question => parseQuestion(question)))
    .then(questions => successfulAction(questions))
    .catch(() => serverError());
};

export const remove = (id) => {
  if (!id) {
    return Promise.resolve(missingParams());
  }

  return db.deleteQuestion(id)
    .then(() => successfulAction())
    .catch(() => serverError());
};
