import React from 'react';
import { shallow } from 'enzyme';
import QuestionsList from './questions-list';

describe('QuestionsList', () => {
  test('renders', () => {
    const wrapper = shallow(<QuestionsList questions={[]} />);
    expect(wrapper.find('.QuestionsList').exists()).toBe(true);
  });
});
