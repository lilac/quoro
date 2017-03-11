import * as types from '../reducers/user';
import { requestWithBody, request } from '../helpers/fetch-helper';

export const logInSuccess = user => ({ type: types.LOG_IN_SUCCESS, payload: user });

export const logInError = message => ({ type: types.LOG_IN_ERROR, payload: message });

export const logIn = (login, password) => dispatch =>
  request('http://localhost:8000/api/users', 'GET', { login, password })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      dispatch(logInError('Cannot log in, please try again later.'));
    })
    .then(response => dispatch(logInSuccess(response.result)))
    .catch(() => dispatch(logInError('Cannot log in, please try again later.')));

export const registerStatus = message => ({ type: types.REGISTER_STATUS, payload: message });

export const register = userData => dispatch =>
  requestWithBody('http://localhost:8000/api/users', 'POST', userData)
  .then(response => response.json())
  .then((result) => {
    dispatch(registerStatus(result.message));
    setTimeout(() => dispatch(registerStatus('')), 5000);
  })
  .catch(() => {
    dispatch(registerStatus('An error occured while fetching data, please try again later.'));
    setTimeout(() => dispatch(registerStatus('')), 5000);
  });
