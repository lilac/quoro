import * as types from '../reducers/user';
import { requestWithBody } from '../helpers/fetch-helper';
import { changeMessage } from './message';
import { startLoading, endLoading } from './is-loading';

export const setUser = user => ({ type: types.SET_USER, payload: user });

export const logIn = (login, password) => (dispatch) => {
  dispatch(startLoading());
  requestWithBody('/api/authorize', 'POST', { login, password })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(({ result: user }) => dispatch(setUser(user)))
    .catch(() => dispatch(changeMessage('Cannot log in, please try again later.', false)))
    .then(() => dispatch(endLoading()));
};

export const logOut = username =>
  (dispatch) => {
    dispatch(setUser());
    dispatch(changeMessage(`Bye ${username}!`, true));
  };

export const register = userData => (dispatch) => {
  dispatch(startLoading());
  requestWithBody('/api/users', 'POST', userData)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    const { login, password } = userData;
    dispatch(changeMessage('User created.', true));
    dispatch(logIn(login, password));
  })
  .catch(() => dispatch(changeMessage('Failed to create user.', false)))
  .then(() => dispatch(endLoading()));
};
