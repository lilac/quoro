export const SET_CATEGORIES = Symbol('SET_CATEGORIES');

const initialState = {
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_CATEGORIES: {
      return Object.assign({}, state, {
        categories: action.payload,
      });
    }

    default: return state;
  }
};
