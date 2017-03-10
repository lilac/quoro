import db from '../../db';
import statusMaker, { serverError, missingParams, successfulAction, resourceNotFound } from '../common/responses-with-status';

export const find = (id) => {
  if (!id) {
    return Promise.resolve(missingParams);
  }

  return db.findQuestion(id)
    .then((result) => {
      if (!result) {
        return resourceNotFound;
      }
      console.log(result);
      const { content, user_id: userId } = result;
      const question = { content, userId };
      return statusMaker(200, { question });
    })
    .catch(() => serverError);
};

export const create = (content, userId) => {
  if (!content || !userId) {
    return Promise.resolve(missingParams);
  }

  return db.createQuestion(content, userId)
    .then(() => successfulAction)
    .catch(() => serverError);
};
