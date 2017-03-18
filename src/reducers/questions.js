export const ADD_QUESTION_SUCCESS = Symbol('ADD_QUESTION_SUCCESS');
export const ADD_QUESTION_ERROR = Symbol('ADD_QUESTION_ERROR');
export const FETCH_QUESTIONS_SUCCESS = Symbol('FETCH_QUESTIONS_SUCCESS');
export const FETCH_QUESTIONS_ERROR = Symbol('FETCH_QUESTIONS_ERROR');
export const ADD_LAST_VIEWED_QUESTION = Symbol('ADD_LAST_VIEWED_QUESTION');

const initialState = {
  questions: [],
  lastViewedQuestions: [],
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LAST_VIEWED_QUESTION: {
      return Object.assign({}, state, {
        lastViewedQuestions: [action.payload, ...state.lastViewedQuestions],
      });
    }

    case FETCH_QUESTIONS_SUCCESS: {
      return Object.assign({}, state, {
        questions: action.payload,
      });
    }

    case FETCH_QUESTIONS_ERROR: {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }

    default: return state;
  }
};
