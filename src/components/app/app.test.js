import React from 'react';
import { shallow } from 'enzyme';
import { App } from './app';

const mockedProps = {
  questions: [],
};

test('Renders correctly', () => {
  const wrapper = shallow(<App {...mockedProps} fetchQuestions={() => {}} />);
  expect(wrapper.find('.App').exists()).toBe(true);
});

test('Loads more questions after clicking "Load More..." button', () => {
  const fetchQuestions = jest.fn();
  const wrapper = shallow(<App {...mockedProps} fetchQuestions={fetchQuestions} />);
  wrapper.setState({ amountOfQuestions: 10 });
  wrapper.find('.App-load').simulate('click');
  expect(wrapper.state('amountOfQuestions')).toBe(20);
  expect(fetchQuestions).toHaveBeenCalledWith(20);
  // one on mount, one on simulated event
  expect(fetchQuestions).toHaveBeenCalledTimes(2);
});

test('Renders button for modal', () => {
  const wrapper = shallow(<App {...mockedProps} fetchQuestions={() => {}} />);
  expect(wrapper.find('.App-modal').exists()).toBe(true);
  expect(wrapper.find('.App-modal').type()).toBe('button');
});
