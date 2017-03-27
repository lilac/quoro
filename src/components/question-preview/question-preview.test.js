import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import QuestionPreview from './question-preview';

describe('QuestionPreview', () => {
  const props = {
    id: 123,
    title: 'title',
    content: 'content',
    addedAt: {},
    image: '',
  };

  test('renders', () => {
    const wrapper = shallow(<QuestionPreview {...props} />);
    expect(wrapper.type()).toBe(Link);
  });
});
