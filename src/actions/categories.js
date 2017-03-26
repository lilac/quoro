import * as types from '../reducers/categories';
import { request } from '../helpers/fetch-helper';
import { changeMessage } from './message';
import { startLoading, endLoading } from './is-loading';

const setCategories = categories =>
  ({ type: types.SET_CATEGORIES, payload: categories });

export const fetchCategories = () => (dispatch) => {
  dispatch(startLoading());
  request('/api/categories', 'GET', {})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(({ result }) => dispatch(setCategories(result)))
    .catch(() => dispatch(changeMessage('Failed to fetch categories', false)))
    .then(() => dispatch(endLoading()));
};
