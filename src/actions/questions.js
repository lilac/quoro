import * as types from '../reducers/questions';
import { request } from '../helpers/fetch-helper';

export const addToLastViewedQuestions = question => ({ type: types.ADD_LAST_VIEWED_QUESTION, payload: question });

export const fetchQuestionsSuccess = questions => ({ type: types.FETCH_QUESTIONS_SUCCESS, payload: questions });

export const fetchQuestionsError = message => ({ type: types.FETCH_QUESTIONS_ERROR }); 

export const fetchQuestions = amount => dispatch =>
  request('http://localhost:8000/api/questions/last', 'GET', { amount })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(response => response.result)
    .then(questions => dispatch(fetchQuestionsSuccess(questions)))
    .catch(() => dispatch(fetchQuestionsError('Failed to fetch questions.')));
