import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Question } from './question';

const props = {
  fetchQuestion() {},
  clearQuestion() {},
  deleteQuestion() {},
  match: {
    params: {
      id: 123,
    },
  },
  user: {
    token: '123',
  },
  author: {
    id: 123,
  },
  question: {
    title: 'title',
    content: 'content',
    userId: 123,
    id: 12,
    image: '',
    addedAt: {
      day: '12/12/2012',
    },
  },
};

test('Renders correctly', () => {
  const wrapper = shallow(<Question {...props} />);
  expect(wrapper.find('.Question').exists()).toBe(true);
});

test('When the question isnt fetched yet, it returns null', () => {
  const specificProps = Object.assign({}, props, {
    question: null,
  });
  const wrapper = shallow(<Question {...specificProps} />);
  expect(wrapper.type()).toBe(null);
});

test('When state prop isDeleted is set to true it renders Redirect', () => {
  const wrapper = shallow(<Question {...props} />);
  wrapper.setState({ isDeleted: true });
  wrapper.update();
  expect(wrapper.type()).toBe(Redirect);
});

test('componentWillMount() calls fetchQuestion', () => {
  const fetchQuestion = jest.fn();
  const specificProps = Object.assign({}, props, {
    fetchQuestion,
  });
  const id = props.match.params.id;
  const token = props.user.token;
  const wrapper = shallow(<Question {...specificProps} />);
  expect(fetchQuestion).toHaveBeenCalledTimes(1);
  expect(fetchQuestion).toHaveBeenCalledWith(id, token);
});

test('componentWillUnmount', () => {
  const clearQuestion = jest.fn();
  const specificProps = Object.assign({}, props, {
    clearQuestion,
  });
  const wrapper = shallow(<Question {...specificProps} />);
  wrapper.unmount();
  expect(clearQuestion).toHaveBeenCalledTimes(1);
  expect(clearQuestion).toHaveBeenCalledWith();
});
