export const LOG_IN = Symbol('LOG_IN');
export const LOG_OUT = Symbol('LOG_OUT');

const initialState = {
  token: '',
  username: '',
  login: '',
  id: 0,
};

export default (state = initialState, action) => {
  console.log(action.payload);
  console.log(action.type);
  switch (action.type) {
    case LOG_IN: {
      return Object.assign({}, state, action.payload);
    }

    case LOG_OUT: {
      return Object.assign({}, state, initialState);
    }

    default: return state;
  }
};
