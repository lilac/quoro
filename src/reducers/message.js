export const CHANGE_MESSAGE = Symbol('CHANGE_MESSAGE');

const initialState = {
  message: '',
  isPositive: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MESSAGE: {
      const { message, isPositive } = action.payload;
      return Object.assign({}, state, {
        message,
        isPositive,
      });
    }
    default: return state;
  }
};
