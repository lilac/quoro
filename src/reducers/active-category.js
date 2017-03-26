export const SET_CATEGORY = Symbol('SET_CATEGORY');

const initialState = {
  questions: [],
  title: '',
};


export default (state = initialState, action) => {
  switch (action.type) {

    case SET_CATEGORY: {
      const { questions, title } = action.payload;
      return Object.assign({}, state, {
        questions,
        title,
      });
    }

    default: return state;
  }
};

