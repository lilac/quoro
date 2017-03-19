export const FETCH_QUESTION = Symbol('FETCH_QUESTION');
export const FETCH_ANSWERS = Symbol('FETCH_ANSWERS');
export const CLEAR_QUESTION = Symbol('CLEAR_QUESTION');

const initialState = {
  question: null,
  answers: [],
  author: null,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case FETCH_QUESTION: {
      const [question, answers, author] = action.payload;
      return Object.assign({}, state, {
        question,
        answers,
        author,
      });
    }

    case FETCH_ANSWERS: {
      return Object.assign({}, state, {
        answers: action.payload,
      });
    }

    case CLEAR_QUESTION: {
      return Object.assign({}, state, {
        question: null,
        answers: [],
        author: null,
      });
    }

    default: return state;
  }
};
