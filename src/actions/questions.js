import * as types from '../reducers/questions';
import { request, requestWithBody } from '../helpers/fetch-helper';
import { changeMessage } from './message';

export const addToLastViewedQuestions = question =>
  ({ type: types.ADD_LAST_VIEWED_QUESTION, payload: question });

const fetchQuestionsSuccess = questions =>
  ({ type: types.FETCH_QUESTIONS, payload: questions });

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
    .catch(() => dispatch(changeMessage('Failed to fetch questions.', false)));

export const addQuestion = (title, content, token, amount = 10) => dispatch =>
  requestWithBody('/api/questions', 'POST', { title, content, token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      dispatch(changeMessage('Question added.', true));
      dispatch(fetchQuestions(amount));
    })
    .catch(() => dispatch(changeMessage('Failed to add question.', false)));

export const searchQuestionsSuccess = questions =>
  ({ type: types.SEARCH_QUESTIONS_SUCCESS, payload: questions });

export const searchQuestions = query => (dispatch) => {
  if (!query) {
    return dispatch(searchQuestionsSuccess([]));
  }

  return request('/api/questions/query', 'GET', { query })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(({ result }) => {
      dispatch(searchQuestionsSuccess(result));
    })
    .catch(() => changeMessage('Failed to fetch questions.'));
};

const setUserQuestions = questions =>
  ({ type: types.SET_USER_QUESTIONS, payload: questions });

export const getUserQuestions = id => dispatch =>
  request(`/api/users/${id}/questions`, 'GET', {})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(({ result }) => dispatch(setUserQuestions(result)))
    .catch(() => dispatch(changeMessage('Failed to fetch questions.', false)));

export const deleteQuestion = (id, token) => dispatch =>
  request('/api/questions', 'DELETE', { id, token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(() => dispatch(fetchQuestions(10)))
    .catch(() => dispatch(changeMessage('Failed to delete question.')));
