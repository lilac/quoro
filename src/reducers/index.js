import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';
import activeQuestion from './active-question';
import message from './message';
import isLoading from './is-loading';
import categories from './categories';
import activeCategory from './active-category';

export default combineReducers({
  categories,
  isLoading,
  user,
  questions,
  activeQuestion,
  message,
  activeCategory,
});
