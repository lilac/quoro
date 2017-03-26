import React from 'react';
import { shallow, mount } from 'enzyme';
import { AnswerForm } from './answer-form';

test('renders correctly', () => {
  const wrapper = shallow(<AnswerForm />);
  expect(wrapper.find('.AnswerForm').exists()).toBe(true);
});

test('the value of textarea is saved in the state', () => {
  const wrapper = shallow(<AnswerForm />);
  const content = 'Hello there.';
  wrapper.find('.AnswerForm-content').simulate('change', {
    target: {
      value: content,
    },
  });
  expect(wrapper.state('content')).toBe(content);
});

test('', () => {
  const addAnswer = jest.fn((content, questionId, userId, token) => null);
  const wrapper = shallow(<AnswerForm />);
});
