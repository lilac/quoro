import * as types from '../constants/action-types';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TEST: {
      return Object.assign({}, state);
    }
    default: return state;
  }
};
