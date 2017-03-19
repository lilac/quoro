export const FETCH_QUESTIONS = Symbol('FETCH_QUESTIONS');
export const ADD_LAST_VIEWED_QUESTION = Symbol('ADD_LAST_VIEWED_QUESTION');

const initialState = {
  questions: [],
  lastViewedQuestions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LAST_VIEWED_QUESTION: {
      return Object.assign({}, state, {
        lastViewedQuestions: [action.payload, ...state.lastViewedQuestions],
      });
    }

    case FETCH_QUESTIONS: {
      return Object.assign({}, state, {
        questions: action.payload,
      });
    }

    default: return state;
  }
};
