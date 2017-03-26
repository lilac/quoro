import React from 'react';
import { shallow } from 'enzyme';
import { lastViewedQuestions as LastViewedQuestions} from './last-viewed-questions';

test('Renders correctly', () => {
  const wrapper = shallow(<LastViewedQuestions />);
  expect(wrapper.find('.LastViewedQuestions').exists()).toBe(true);
});
