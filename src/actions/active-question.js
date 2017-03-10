import * as types from '../reducers/active-question';

export const fetchQuestionError = msg => ({ type: types.FETCH_QUESTION_ERROR, payload: msg });
export const fetchQuestionSuccess = result => ({ type: types.FETCH_QUESTION_SUCCESS, payload: result });

export const fetchQuestion = (id, token) => {
  const apiQuestions = [
    `http://localhost:8000/api/questions/${id}?`,
    `http://localhost:8000/api/answers/${id}?`,
    `http://localhost:8000/api/questions/${id}?`,
  ].map(value => fetch(`${value}token=${token}`));

  return dispatch =>
    Promise.all(apiQuestions)
    .then(...results => results.map((result) => {
      if (!result.ok) {
        throw new Error();
      }

      return result.json();
    }))
    .then((...results) => {
      dispatch(fetchQuestionSuccess(results));
    })
    .catch(() => {
      console.log('err!');
      dispatch(fetchQuestionError('Something went wrong!'));
    });
};

export const clearQuestion = () => ({ type: types.CLEAR_QUESTION });
