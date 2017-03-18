import * as types from '../reducers/user';
import { requestWithBody } from '../helpers/fetch-helper';

export const logInSuccess = user => ({ type: types.LOG_IN_SUCCESS, payload: user });

export const logInError = message => ({ type: types.LOG_IN_ERROR, payload: message });

export const logIn = (login, password) => dispatch =>
  requestWithBody('/api/authorize', 'POST', { login, password })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(response => dispatch(logInSuccess(response.result)))
    .catch(() => dispatch(logInError('Cannot log in, please try again later.')));

export const registerStatus = message => ({ type: types.REGISTER_STATUS, payload: message });

export const register = userData => dispatch =>
  requestWithBody('/api/users', 'POST', userData)
  .then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .then((result) => {
    dispatch(registerStatus(result.message));
    setTimeout(() => dispatch(registerStatus('')), 5000);
  })
  .catch(() => {
    dispatch(registerStatus('An error occured while fetching data, please try again later.'));
    setTimeout(() => dispatch(registerStatus('')), 5000);
  });
