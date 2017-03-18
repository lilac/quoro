import * as types from '../reducers/questions';
import { request, requestWithBody } from '../helpers/fetch-helper';

export const addToLastViewedQuestions = question =>
  ({ type: types.ADD_LAST_VIEWED_QUESTION, payload: question });

export const fetchQuestionsSuccess = questions =>
  ({ type: types.FETCH_QUESTIONS_SUCCESS, payload: questions });

export const fetchQuestionsError = message =>
  ({ type: types.FETCH_QUESTIONS_ERROR, payload: message });

export const fetchQuestions = amount => dispatch =>
  request('/api/questions/last', 'GET', { amount })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(response => response.result)
    .then(questions => dispatch(fetchQuestionsSuccess(questions)))
    .catch(() => dispatch(fetchQuestionsError('Failed to fetch questions.')));

export const addQuestionSuccess = () => ({ type: types.ADD_QUESTION_SUCCESS });

export const addQuestionError = () => ({ type: types.ADD_QUESTION_ERROR });

export const addQuestion = (title, content, token, amount = 10) => dispatch =>
  requestWithBody('/api/questions', 'POST', { title, content, token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      dispatch(addQuestionSuccess());
      dispatch(fetchQuestions(amount));
    })
    .catch(() => dispatch(addQuestionError()));
