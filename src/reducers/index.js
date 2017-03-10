import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';
import activeQuestion from './active-question';

export default combineReducers({
  user,
  questions,
  activeQuestion,
});
