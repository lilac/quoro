import * as types from '../reducers/user';

export const setUser = user => ({ type: types.SET_ACTIVE_USER, payload: user });

export const setError = message => ({ type: types.SET_USER_ERROR, payload: message });

export const logIn = (login, password) => (dispatch) => {
  fetch('...')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      dispatch(setError('Cannot log in, please try again later.'));
    })
    .then(user => dispatch(setUser(user)))
    .catch(() => dispatch(setError('Cannot log in, please try again later.')));
};

