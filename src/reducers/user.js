export const SET_USER = Symbol('SET_USER');

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
    case SET_USER: {
      const user = action.payload || initialState;
      return Object.assign({}, state, user);
    }

    default: return state;
  }
};
