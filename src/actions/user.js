import * as types from '../reducers/user';
import { requestWithBody } from '../helpers/fetch-helper';
import { changeMessage } from './message';
import socket from '../socket-client';

export const logInSuccess = user => ({ type: types.LOG_IN, payload: user });

export const logIn = (login, password) => dispatch =>
  requestWithBody('/api/authorize', 'POST', { login, password })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((response) => {
      dispatch(logInSuccess(response.result));
    })
    .catch(() =>
      dispatch(changeMessage('Cannot log in, please try again later.', false))
    );

const logOutSuccess = () => ({ type: types.LOG_OUT });

export const logOut = username =>
  (dispatch) => {
    dispatch(logOutSuccess());
    dispatch(changeMessage(`Bye ${username}!`, true));
  };

export const register = userData => dispatch =>
  requestWithBody('/api/users', 'POST', userData)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    const { login, password } = userData;
    dispatch(changeMessage('User created.', true));
    dispatch(logIn(login, password));
  })
  .catch(() => dispatch(changeMessage('Failed to create user.', false)));
