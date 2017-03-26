import React from 'react';
import { shallow, mount } from 'enzyme';
import { AnswerForm } from './answer-form';

const question = {
  questionId: 5,
  userId: 10,
  token: '123',
};

test('Renders correctly', () => {
  const wrapper = shallow(<AnswerForm addAnswer={() => {}} {...question} />);
  expect(wrapper.find('.AnswerForm').exists()).toBe(true);
});

test('Writing in textarea changes the state', () => {
  const wrapper = shallow(<AnswerForm addAnswer={() => {}} {...question} />);
  const content = 'Hello there.';
  wrapper.find('.AnswerForm-content').simulate('change', {
    target: {
      value: content,
    },
  });
  expect(wrapper.state('content')).toBe(content);
});

test('Submits the form correctly', () => {
  const addAnswer = jest.fn();
  const { questionId, userId, token } = question;
  const wrapper = shallow(<AnswerForm addAnswer={addAnswer} {...question} />);
  wrapper.setState({ content: 'content' });
  wrapper.find('.AnswerForm').simulate('submit', {
    preventDefault() {
      return null;
    },
  });
  expect(addAnswer).toHaveBeenLastCalledWith('content', questionId, userId, token);
  expect(addAnswer).toHaveBeenCalledTimes(1);
});
