import React from 'react';
import { shallow } from 'enzyme';
import { CategoryQuestions } from './category-questions';

const match = {
  params: {
    id: 13,
  },
};

const categories = [{ categoryId: 13, title: 'title' }];

test('Renders correctly', () => {
  const wrapper = shallow(
    <CategoryQuestions
      fetchCategory={() => {}}
      setCategory={() => {}}
      match={match}
      categories={categories}
    />
  );
  expect(wrapper.find('.CategoryQuestions').exists()).toBe(true);
});

test('componentWillMount() calls fetchCategory', () => {
  const fetchCategory = jest.fn();
  const wrapper = shallow(
    <CategoryQuestions
      fetchCategory={fetchCategory}
      setCategory={() => {}}
      match={match}
      categories={categories}
    />
  );
  expect(fetchCategory).toHaveBeenCalledTimes(1);
  expect(fetchCategory).toHaveBeenCalledWith(match.params.id, categories[0].title);
});

test('componentWillUnmount calls setCategory', () => {
  const setCategory = jest.fn();
  const wrapper = shallow(
    <CategoryQuestions
      fetchCategory={() => {}}
      setCategory={setCategory}
      match={match}
      categories={categories}
    />
  );
  wrapper.unmount();
  expect(setCategory).toHaveBeenCalledTimes(1);
  expect(setCategory).toHaveBeenCalledWith({ questions: [], title: '' });
});
