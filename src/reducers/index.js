import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';
import activeQuestion from './active-question';
import message from './message';
import isLoading from './is-loading';

export default combineReducers({
  isLoading,
  user,
  questions,
  activeQuestion,
  message,
});
