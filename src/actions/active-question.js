import * as types from '../reducers/active-question';
import { request, requestWithBody } from '../helpers/fetch-helper';
import { addToLastViewedQuestions } from './questions';
import { changeMessage } from './message';
import { startLoading, endLoading } from './is-loading';

const setFetchedQuestion = results =>
  ({ type: types.SET_FETCHED_QUESTION, payload: results });

export const fetchQuestion = (id, token) => (dispatch) => {
  dispatch(startLoading());
  request(`/api/questions/${id}`, 'GET', { token })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .then(({ result: question }) => {
    const { userId } = question;
    const apiQuestions = [
      `/api/answers/${id}`,
      `/api/users/${userId}`,
    ].map(url => request(url, 'GET', { token }));

    return Promise.all(apiQuestions)
      .then((responses) => {
        const results = responses.map((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response.json();
        });
        return Promise.all(results);
      })
      .then(results => results.map(res => res.result))
      .then(results => [question, ...results]);
  })
  .then((results) => {
    const [question] = results;
    dispatch(setFetchedQuestion(results));
    dispatch(addToLastViewedQuestions(question));
  })
  .catch(() => dispatch(changeMessage('Failed to fetch question.', false)))
  .then(() => dispatch(endLoading()));
};

export const clearQuestion = () =>
  ({ type: types.CLEAR_QUESTION });

const setFetchedAnswers = answers =>
  ({ type: types.SET_FETCHED_ANSWERS, payload: answers });

export const fetchAnswers = (questionId, token) => (dispatch) => {
  dispatch(startLoading());
  request(`/api/answers/${questionId}`, 'GET', { token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(({ result: answers }) => dispatch(setFetchedAnswers(answers)))
    .catch(() => changeMessage('Failed to fetch answers.', false))
    .then(() => dispatch(endLoading()));
};

export const addAnswer = (content, questionId, userId, token) => (dispatch) => {
  dispatch(startLoading());
  requestWithBody('/api/answers', 'POST', { content, questionId, userId, token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      dispatch(changeMessage('Answer added.', true));
      return dispatch(fetchAnswers(questionId, token));
    })
    .catch(() => dispatch(changeMessage('Failed to add answer.', false)))
    .then(() => dispatch(endLoading()));
};

export const deleteAnswer = (answerId, questionId, token) => (dispatch) => {
  dispatch(startLoading());
  request('/api/answers', 'DELETE', { id: answerId, token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      dispatch(changeMessage('Answer deleted.', true));
      return dispatch(fetchAnswers(questionId, token));
    })
    .catch(() => dispatch(changeMessage('Failed to delete answer.')))
    .then(() => dispatch(endLoading()));
};

