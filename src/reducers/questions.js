export const ADD_QUESTION = Symbol('ADD_QUESTION');
export const FETCH_QUESTIONS = Symbol('FETCH_QUESTIONS');
export const FETCH_QUESTIONS_ERROR = Symbol('FETCH_QUESTIONS_ERROR');
export const FETCH_QUESTION_DATA = Symbol('FETCH_QUESTION_DATA');
export const ADD_LAST_VIEWED_QUESTION = Symbol('ADD_LAST_VIEWED_QUESTION');

const initialState = {
  questions: [],
  lastViewedQuestions: [],
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION: {
      return Object.assign({}, state, {
        questions: [...state.questions, action.payload],
      });
    }

    case FETCH_QUESTION_DATA: {
      return Object.assign({}, state, {

      });
    }

    case ADD_LAST_VIEWED_QUESTION: {
      return Object.assign({}, state, {
        lastViewedQuestions: [...state.lastViewedQuestions, action.payload],
      });
    }

    case FETCH_QUESTIONS: {
      return Object.assign({}, state, {
        questions: action.payload,
      });
    }

    case FETCH_QUESTIONS_ERROR: {
      return Object.assign({}, state, {
        fetchError: action.payload,
      });
    }

    default: return state;
  }
};
