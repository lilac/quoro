export const LOG_IN_SUCCESS = Symbol('LOG_IN_SUCCESS');
export const LOG_IN_ERROR = Symbol('LOG_IN_ERROR');
export const REGISTER_STATUS = Symbol('REGISTER_STATUS');

const initialState = {
  activeUser: null,
  message: '',
};

export default (state = initialState, action) => {
  console.log(action.payload);
  console.log(action.type);
  switch (action.type) {
    case LOG_IN_SUCCESS: {
      return Object.assign({}, state, {
        activeUser: action.payload,
      });
    }
    case LOG_IN_ERROR: {
      return Object.assign({}, state, {
        message: action.payload,
      });
    }
    case REGISTER_STATUS: {
      return Object.assign({}, state, {
        message: action.payload,
      });
    }
    default: return state;
  }
};
