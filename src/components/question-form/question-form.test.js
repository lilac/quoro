import React from 'react';
import { shallow, mount } from 'enzyme';
import { QuestionForm } from './question-form';

const props = {
  user: {
    token: '123',
  },
  addQuestion() {},
  categories: [],
};

test('Renders correctly', () => {
  const wrapper = shallow(<QuestionForm {...props} />);
  expect(wrapper.find('.QuestionForm').exists()).toBe(true);
});

test('On image upload it saves it in the state as Base64 encoded string', (done) => {
  const wrapper = shallow(<QuestionForm {...props} />);
  const file = new File(['1231231', '123123123', '12312312312', '123123123'], 'a.jpg');
  const reader = new FileReader();

  wrapper.find('#image').simulate('change', {
    target: {
      files: [
        file,
      ],
    },
  });

  reader.addEventListener('load', () => {
    const { result } = reader;
    expect(wrapper.state('image')).toBe(result);
    done();
  });

  reader.readAsDataURL(file);
});

test('It renders categories', () => {
  const specificProps = Object.assign({}, props, {
    categories: [
      { categoryId: 15, title: 'title' },
      { categoryId: 16, title: 'title' },
      { categoryId: 17, title: 'title' },
    ],
  });
  const wrapper = mount(<QuestionForm {...specificProps} />);
  expect(wrapper.find('.CategoryOption').length).toBe(3);
});

test('It saves chosen category in the state', () => {
  const wrapper = shallow(<QuestionForm {...props} />);
  const value = 123;
  wrapper.find('.QuestionForm-categories').simulate('change', {
    target: {
      value,
    },
  });
  expect(wrapper.state('categoryId')).toBe(value);
});

test('It saves title in the state', () => {
  const wrapper = shallow(<QuestionForm {...props} />);
});

test('onSubmit() calls addQuestion() and clears state', () => {
  const addQuestion = jest.fn();
  const specificProps = Object.assign({}, props, {
    addQuestion,
  });
  const wrapper = shallow(<QuestionForm {...specificProps} />);
  const title = 'title';
  const content = 'content';
  const image = 'image';
  const categoryId = 123;
  wrapper.setState({ title, content, image, categoryId });
  wrapper.find('.QuestionForm').simulate('submit', { preventDefault() {} });
  expect(addQuestion).toHaveBeenCalledTimes(1);
  expect(addQuestion).toHaveBeenCalledWith(title, content, image, categoryId, props.user.token);
  expect(wrapper.state('title')).toBe('');
  expect(wrapper.state('content')).toBe('');
  expect(wrapper.state('image')).toBe('');
  expect(wrapper.state('categoryId')).toBe(0);
});

test('When no data in the state, onSubmit() will not call addQuestion', () => {
  const addQuestion = jest.fn();
  const specificProps = Object.assign({}, props, {
    addQuestion,
  });
  const wrapper = shallow(<QuestionForm {...specificProps} />);
  wrapper.find('.QuestionForm').simulate('submit', { preventDefault() {} });
  expect(addQuestion).toHaveBeenCalledTimes(0);
});

test('Writing in #title input changes its value in the state', () => {
  const wrapper = shallow(<QuestionForm {...props} />);
  const value = 'title';
  wrapper.find('#title').simulate('change', { target: { value } });
  expect(wrapper.state('title')).toBe(value);
});

test('Writing in #content input changes its value in the state', () => {
  const wrapper = shallow(<QuestionForm {...props} />);
  const value = 'content';
  wrapper.find('#content').simulate('change', { target: { value } });
  expect(wrapper.state('content')).toBe(value);
});

test('clicking submit button calls onSubmit()', () => {
  const addQuestion = jest.fn();
  const specificProps = Object.assign({}, props, {
    addQuestion,
  });
  const wrapper = shallow(<QuestionForm {...specificProps} />);
  const title = 'title';
  const content = 'content';
  const image = 'image';
  const categoryId = 123;
  wrapper.setState({ title, content, image, categoryId });
  wrapper.find('.QuestionForm-submit').simulate('click', { preventDefault() {} });
  expect(addQuestion).toHaveBeenCalledTimes(1);
  expect(addQuestion).toHaveBeenCalledWith(title, content, image, categoryId, props.user.token);
});
