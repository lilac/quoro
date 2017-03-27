import React from 'react';
import { shallow, mount } from 'enzyme';
import { answer as Answer } from './answer';

const user = {
  token: '123',
  id: 24,
};

const answer = {
  content: 'Some answer',
  answerId: 1,
  userId: 24,
  questionId: 5,
};

const deleteAnswer = () => {};

test('renders answer', () => {
  const wrapper = shallow(<Answer user={user} {...answer} deleteAnswer={deleteAnswer} />);
  expect(wrapper.find('.Answer').exists()).toBe(true);
});

test('if id matches userId it will render close button', () => {
  const wrapper = mount(
    <Answer
      user={user}
      {...answer}
      deleteAnswer={deleteAnswer}
    />
  );
  expect(wrapper.find('.CloseButton').exists()).toBe(true);
});

test('if id doesnt match userId it wont render close button', () => {
  const changedUser = Object.assign({}, user, {
    id: 100,
  });
  const wrapper = mount(<Answer user={changedUser} {...answer} deleteAnswer={deleteAnswer} />);
  expect(wrapper.find('.CloseButton').exists()).toBe(false);
});

