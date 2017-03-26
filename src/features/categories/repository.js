import db from '../../db';
import { missingParams, serverError, successfulAction } from '../common/responses-with-status';
import parseQuestion from '../common/parse-question';

export const find = (id) => {
  if (!id) {
    return Promise.resolve(missingParams());
  }

  return db.findQuestionsWithCategory(id)
    .then(questions =>
      questions.map(question => parseQuestion(question)).reverse()
    )
    .then(questions => successfulAction(questions))
    .catch(() => serverError());
};

export const findAllCategories = () =>
  db.findAllCategories()
    .then(categories =>
      categories.map(({ id_cat, title_cat }) => ({
        categoryId: id_cat,
        title: title_cat,
      }))
    )
    .then(categories => successfulAction(categories))
    .catch(() => serverError());
