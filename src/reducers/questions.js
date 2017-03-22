export const SET_QUESTIONS = Symbol('SET_QUESTIONS');
export const ADD_LAST_VIEWED_QUESTION = Symbol('ADD_LAST_VIEWED_QUESTION');
export const DELETE_LAST_VIEWED_QUESTION = Symbol('DELETE_LAST_VIEWED_QUESTION');
export const SET_SEARCHED_QUESTIONS = Symbol('SET_SEARCHED_QUESTIONS');
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

    case DELETE_LAST_VIEWED_QUESTION: {
      const deletedId = action.payload;
      const lastViewedQuestions = state.lastViewedQuestions.filter(({ id }) => id !== deletedId);
      return Object.assign({}, state, {
        lastViewedQuestions,
      });
    }

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

    case SET_QUESTIONS: {
      return Object.assign({}, state, {
        questions: action.payload,
      });
    }

    case SET_SEARCHED_QUESTIONS: {
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
