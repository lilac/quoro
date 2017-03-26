import * as types from '../reducers/active-category';
import { request } from '../helpers/fetch-helper';
import { changeMessage } from './message';
import { startLoading, endLoading } from './is-loading';

export const setCategory = result =>
  ({ type: types.SET_CATEGORY, payload: result });

export const fetchCategory = (id, title) => (dispatch) => {
  dispatch(startLoading());
  request(`/api/categories/${id}`, 'GET', {})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(({ result }) => {
      dispatch(setCategory({ questions: result, title }));
    })
    .catch(() => dispatch(changeMessage('Failed to fetch questions', false)))
    .then(() => dispatch(endLoading()));
};
