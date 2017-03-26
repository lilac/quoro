import * as types from '../reducers/questions';
import { request, requestWithBody } from '../helpers/fetch-helper';
import { changeMessage } from './message';
import { startLoading, endLoading } from './is-loading';

const setQuestions = questions =>
  ({ type: types.SET_QUESTIONS, payload: questions });

export const fetchQuestions = amount => (dispatch) => {
  dispatch(startLoading());
  request('/api/questions/last', 'GET', { amount })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(({ result: questions }) => dispatch(setQuestions(questions)))
    .catch(() => dispatch(changeMessage('Failed to fetch questions.', false)))
    .then(() => dispatch(endLoading()));
};

export const addQuestion = (title, content, image = '', categoryId, token, amount = 10) => (dispatch) => {
  dispatch(startLoading());
  requestWithBody('/api/questions', 'POST', { title, content, image, categoryId, token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      dispatch(changeMessage('Question added.', true));
      dispatch(fetchQuestions(amount));
    })
    .catch(() => dispatch(changeMessage('Failed to add question.', false)))
    .then(() => dispatch(endLoading()));
};

export const setSearchedQuestions = questions =>
  ({ type: types.SET_SEARCHED_QUESTIONS, payload: questions });

export const searchQuestions = query => (dispatch) => {
  if (!query) {
    return dispatch(setSearchedQuestions([]));
  }

  dispatch(startLoading());

  return request('/api/questions/query', 'GET', { query })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(({ result: questions }) => dispatch(setSearchedQuestions(questions)))
    .catch(() => changeMessage('Failed to fetch questions.'))
    .then(() => dispatch(endLoading()));
};

const setUserQuestions = questions =>
  ({ type: types.SET_USER_QUESTIONS, payload: questions });

export const getUserQuestions = id => (dispatch) => {
  dispatch(startLoading());
  request(`/api/users/${id}/questions`, 'GET', {})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(({ result: questions }) => dispatch(setUserQuestions(questions)))
    .catch(() => dispatch(changeMessage('Failed to fetch questions.', false)))
    .then(() => dispatch(endLoading()));
};

const deleteFromLastViewedQuestions = id =>
  ({ type: types.DELETE_LAST_VIEWED_QUESTION, payload: id });

export const addToLastViewedQuestions = question =>
  ({ type: types.ADD_LAST_VIEWED_QUESTION, payload: question });

export const deleteQuestion = (id, token) => (dispatch) => {
  dispatch(startLoading());
  request('/api/questions', 'DELETE', { id, token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then(() => {
      dispatch(fetchQuestions(10));
      dispatch(deleteFromLastViewedQuestions(id));
    })
    .catch(() => dispatch(changeMessage('Failed to delete question.', false)))
    .then(() => dispatch(endLoading()));
};
