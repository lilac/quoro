export const SET_FETCHED_QUESTION = Symbol('SET_FETCHED_QUESTION');
export const SET_FETCHED_ANSWERS = Symbol('SET_FETCHED_ANSWERS');
export const CLEAR_QUESTION = Symbol('CLEAR_QUESTION');
export const SET_IS_LOADING = Symbol('SET_IS_LOADING');

const initialState = {
  question: null,
  answers: [],
  author: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_IS_LOADING: {
      return Object.assign({}, state, {
        isLoading: Boolean(action.payload),
      });
    }

    case SET_FETCHED_QUESTION: {
      const [question, answers, author] = action.payload;
      return Object.assign({}, state, {
        question,
        answers,
        author,
      });
    }

    case SET_FETCHED_ANSWERS: {
      return Object.assign({}, state, {
        answers: action.payload,
      });
    }

    case CLEAR_QUESTION: {
      return Object.assign({}, state, initialState);
    }

    default: return state;
  }
};
