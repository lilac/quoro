import * as types from '../reducers/message';

const setMessage = (message, isPositive) =>
  ({ type: types.CHANGE_MESSAGE, payload: { message, isPositive } });

export const changeMessage = (message, isPositive) =>
  (dispatch) => {
    dispatch(setMessage(message, isPositive));
    setTimeout(() => {
      dispatch(setMessage('', true));
    }, 3000);
  };
