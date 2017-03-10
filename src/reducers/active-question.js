export const FETCH_QUESTION_ERROR = Symbol('FETCH_QUESTION_ERROR');
export const FETCH_QUESTION_SUCCESS = Symbol('FETCH_QUESTION_SUCCESS');
export const CLEAR_QUESTION = Symbol('CLEAR_QUESTION');

const initialState = {
  question: null,
  answers: [],
  author: null,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION_ERROR: {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }

    case FETCH_QUESTION_SUCCESS: {
      const [question, answers, author] = action.payload;
      return Object.assign({}, state, {
        question,
        answers,
        author,
        error: '',
      });
    }

    case CLEAR_QUESTION: {
      return Object.assign({}, state, {
        question: null,
        answers: [],
        author: null,
        error: '',
      });
    }

    default: return state;
  }
};
