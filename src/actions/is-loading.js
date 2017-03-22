import * as types from '../reducers/is-loading';

const setState = state =>
  ({ type: types.SET_STATE, payload: state });

export const startLoading = () => setState(true);

export const endLoading = (time = 450) => dispatch =>
  setTimeout(() => {
    dispatch(setState(false));
  }, time);
