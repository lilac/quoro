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

export const create = (content, userId) => {
  if (!content || !userId) {
    return Promise.resolve(missingParams());
  }

  return db.createQuestion(content, userId)
    .then(() => successfulAction())
    .catch(() => serverError());
};

export const findLast = (amount) => {
  if (!amount) {
    return Promise.resolve(missingParams());
  }
  return db.findLastQuestions(amount)
    .then((results) => {
      if (!results) {
        throw new Error();
      }
      return results.map(question => parseQuestion(question));
    })
    .then(questions => successfulAction(questions))
    .catch(() => serverError());
};
