import * as types from '../reducers/questions';

export const addToLastViewedQuestions = question => ({ type: types.ADD_LAST_VIEWED_QUESTION, payload: question });
