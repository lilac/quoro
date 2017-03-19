import * as types from '../reducers/active-question';
import { request, requestWithBody } from '../helpers/fetch-helper';
import { addToLastViewedQuestions } from './questions';
import { changeMessage } from './message';

const fetchQuestionSuccess = results =>
  ({ type: types.FETCH_QUESTION, payload: results });

export const fetchQuestion = (id, token) => dispatch =>
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
      dispatch(fetchQuestionSuccess(results));
      dispatch(addToLastViewedQuestions(question));
    })
    .catch(() => dispatch(changeMessage('', false)));

export const clearQuestion = () =>
  ({ type: types.CLEAR_QUESTION });

const fetchAnswersSuccess = answers =>
  ({ type: types.FETCH_ANSWERS, payload: answers });

export const fetchAnswers = (questionId, token) => dispatch =>
  request(`/api/answers/${questionId}`, 'GET', { token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(responseJson => responseJson.result)
    .then(answers => dispatch(fetchAnswersSuccess(answers)))
    .catch(() => changeMessage('Failed to fetch answers.', false));

export const addAnswer = (content, questionId, userId, token) => dispatch =>
  requestWithBody('/api/answers', 'POST', { content, questionId, userId, token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      dispatch(changeMessage('Answer added.', true));
      return dispatch(fetchAnswers(questionId, token));
    })
    .catch(() => dispatch(changeMessage('Failed to add answer.', false)));

export const deleteAnswer = (answerId, questionId, token) => dispatch =>
  request('/api/answers', 'DELETE', { id: answerId, token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      dispatch(changeMessage('Answer deleted.', true));
      return dispatch(fetchAnswers(questionId, token));
    })
    .catch(() => dispatch(changeMessage('Failed to delete answer.')));
