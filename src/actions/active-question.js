import * as types from '../reducers/active-question';
import { request } from '../helpers/fetch-helper';

export const fetchQuestionError = msg => ({ type: types.FETCH_QUESTION_ERROR, payload: msg });

export const fetchQuestionSuccess = results =>
  ({ type: types.FETCH_QUESTION_SUCCESS, payload: results });

export const fetchQuestion = (id, token) => dispatch =>
    request(`http://localhost:8000/api/questions/${id}`, 'GET', { token })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then(({ result: question }) => {
      const { userId } = question;
      const apiQuestions = [
        `http://localhost:8000/api/answers/${id}`,
        `http://localhost:8000/api/users/${userId}`,
      ].map(url => request(url, 'GET', { token }));
      return Promise.all(apiQuestions)
        .then((responses) => {
          const results = responses.map((result) => {
            if (!result.ok) {
              throw new Error();
            }
            return result.json();
          });
          return Promise.all(results);
        })
        .then(results => results.map(res => res.result))
        .then(results => [question, ...results]);
    })
    .then(results => dispatch(fetchQuestionSuccess(results)))
    .catch(() => dispatch(fetchQuestionError('Something went wrong!')));

export const clearQuestion = () => ({ type: types.CLEAR_QUESTION });
