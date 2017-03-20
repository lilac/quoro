export const FETCH_QUESTIONS = Symbol('FETCH_QUESTIONS');
export const ADD_LAST_VIEWED_QUESTION = Symbol('ADD_LAST_VIEWED_QUESTION');
export const SEARCH_QUESTIONS_SUCCESS = Symbol('SEARCH_QUESTIONS_SUCCESS');
export const SET_USER_QUESTIONS = Symbol('SET_USER_QUESTIONS');

const initialState = {
  questions: [],
  lastViewedQuestions: [],
  searchByQueryQuestions: [],
  userQuestions: [],
};

const checkIfInArr = (id, arr) =>
  arr.map(item => item.id).some(value => value === id);

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LAST_VIEWED_QUESTION: {
      const question = action.payload;
      let lastViewedQuestions = [action.payload, ...state.lastViewedQuestions];
      // so there would be no duplicates
      if (checkIfInArr(question.id, state.lastViewedQuestions)) {
        lastViewedQuestions = [...state.lastViewedQuestions];
      }
      return Object.assign({}, state, {
        lastViewedQuestions,
      });
    }

    case FETCH_QUESTIONS: {
      return Object.assign({}, state, {
        questions: action.payload,
      });
    }

    case SEARCH_QUESTIONS_SUCCESS: {
      return Object.assign({}, state, {
        searchByQueryQuestions: action.payload,
      });
    }

    case SET_USER_QUESTIONS: {
      return Object.assign({}, state, {
        userQuestions: action.payload,
      });
    }

    default: return state;
  }
};
