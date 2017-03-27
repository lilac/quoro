import React from 'react';
import { Link } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import QuestionLink from './question-link';

describe('QuestionLink', () => {
  const props = {
    id: 123,
    title: 'title',
  };

  test('renders link', () => {
    const wrapper = shallow(<QuestionLink {...props} />);
    expect(wrapper.type()).toBe(Link);
  });
});
