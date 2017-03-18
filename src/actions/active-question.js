import * as types from '../reducers/active-question';
import { request, requestWithBody } from '../helpers/fetch-helper';
import { addToLastViewedQuestions } from './questions';

const fetchQuestionError = msg =>
  ({ type: types.FETCH_QUESTION_ERROR, payload: msg });

const fetchQuestionSuccess = results =>
  ({ type: types.FETCH_QUESTION_SUCCESS, payload: results });

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
    .catch(() => dispatch(fetchQuestionError('Something went wrong!')));

export const clearQuestion = () =>
  ({ type: types.CLEAR_QUESTION });

const fetchAnswersError = () =>
  ({ type: types.FETCH_ANSWERS_ERROR });

const fetchAnswersSuccess = answers =>
  ({ type: types.FETCH_ANSWERS_SUCCESS, payload: answers });

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
    .catch(() => fetchAnswersError());

const addAnswerSuccess = () =>
  ({ type: types.ADD_ANSWER_SUCCESS });

const addAnswerError = msg =>
  ({ type: types.ADD_ANSWER_ERROR, payload: msg });

export const addAnswer = (content, questionId, userId, token) => dispatch =>
  requestWithBody('/api/answers', 'POST', { content, questionId, userId, token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      dispatch(addAnswerSuccess());
      return dispatch(fetchAnswers(questionId, token));
    })
    .catch(() => dispatch(addAnswerError('ERROR')));

const deleteAnswerSuccess = () =>
  ({ type: types.DELETE_ANSWER_SUCCESS });

const deleteAnswerError = msg =>
  ({ type: types.DELETE_ANSWER_ERROR, payload: msg });

export const deleteAnswer = (answerId, questionId, token) => dispatch =>
  request('/api/answers', 'DELETE', { id: answerId, token })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      dispatch(fetchAnswers(questionId, token));
      return dispatch(deleteAnswerSuccess());
    })
    .catch(() => dispatch(deleteAnswerError('Couldnt delete the answer.')));
