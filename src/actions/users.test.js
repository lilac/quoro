import { logIn } from './users';
import * as types from '../constants/action-types';

test('logIn returns action with good type', () => {
  const action = logIn();
  expect(action.type).toBe(types.LOG_IN);
});
