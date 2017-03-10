export const SET_ACTIVE_USER = Symbol('SET_USER');
export const SET_USER_ERROR = Symbol('SET_USER_ERROR');

const initialState = {
  activeUser: {
    token: '',
  },
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_USER: {
      return Object.assign({}, state, {
        activeUser: action.payload,
      });
    }
    case SET_USER_ERROR: {
      return Object.assign({}, state, {
        
      });
    }
    default: return state;
  }
};
