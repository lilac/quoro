export const SET_STATE = Symbol('SET_STATE');

const initialState = {
  state: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_STATE: {
      return Object.assign({}, state, {
        state: Boolean(action.payload),
      });
    }

    default: return state;
  }
};
