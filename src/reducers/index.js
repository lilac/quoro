import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';
import activeQuestion from './active-question';
import message from './message';

export default combineReducers({
  user,
  questions,
  activeQuestion,
  message,
});
