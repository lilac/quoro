export const FETCH_QUESTION_ERROR = Symbol('FETCH_QUESTION_ERROR');
export const FETCH_QUESTION_SUCCESS = Symbol('FETCH_QUESTION_SUCCESS');
export const FETCH_ANSWERS_SUCCESS = Symbol('FETCH_ANSWERS_SUCCESS');
export const FETCH_ANSWERS_ERROR = Symbol('FETCH_ANSWERS_ERROR');
export const ADD_ANSWER_SUCCESS = Symbol('ADD_ANSWER_SUCCESS');
export const ADD_ANSWER_ERROR = Symbol('ADD_ANSWER_ERROR');
export const CLEAR_QUESTION = Symbol('CLEAR_QUESTION');
export const DELETE_ANSWER_SUCCESS = Symbol('DELETE_ANSWER_SUCCESS');
export const DELETE_ANSWER_ERROR = Symbol('DELETE_ANSWER_ERROR');

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

    case ADD_ANSWER_SUCCESS: {
      return Object.assign({}, state, {
        error: '',
      });
    }

    case ADD_ANSWER_ERROR: {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }

    case FETCH_ANSWERS_SUCCESS: {
      return Object.assign({}, state, {
        answers: action.payload,
      });
    }

    case FETCH_ANSWERS_ERROR: {
      return Object.assign({}, state, {
        error: 'Error while fetching data.',
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

    case DELETE_ANSWER_SUCCESS: {
      return Object.assign({}, state, {
        error: '',
      });
    }

    case DELETE_ANSWER_ERROR: {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }

    default: return state;
  }
};
