import db from '../../db';
import { missingParams, successfulAction, serverError } from '../common/responses-with-status';

export const create = (content, authorId, questionId) => {
  if (!content || !authorId || !questionId) {
    return Promise.resolve(missingParams());
  }

  return db.createAnswer(questionId, authorId, content)
    .then(() => successfulAction())
    .catch(() => serverError());
};

export const remove = (id) => {
  if (!id) {
    return Promise.resolve(missingParams());
  }

  return db.deleteAnswer(id)
    .then(() => successfulAction())
    .catch(() => serverError());
};

export const update = (id, content) => {
  if (!id || !content) {
    return Promise.resolve(missingParams());
  }

  return db.updateAnswer(id, content)
    .then(() => successfulAction())
    .catch(() => serverError());
};

export const find = (qId) => {
  if (!qId) {
    return Promise.resolve(missingParams());
  }
  return db.findAnswers(qId)
    .then(answers =>
      answers.map((answer) => {
        const { answ_id: answerId, id_q: questionId, content, user_id: userId } = answer;
        return { answerId, questionId, content, userId };
      }).reverse()
    )
    .then(answers => successfulAction(answers))
    .catch(() => serverError());
};
