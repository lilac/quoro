import React from 'react';
import { shallow } from 'enzyme';
import CategoryOption from './category-option';

const category = {
  categoryId: 123,
  title: 'title',
};

test('Renders correctly', () => {
  const wrapper = shallow(<CategoryOption {...category} />);
  expect(wrapper.find('.CategoryOption').exists()).toBe(true);
});

test('Renders option with provided title as value', () => {
  const wrapper = shallow(<CategoryOption {...category} />);
  expect(wrapper.type()).toBe('option');
  expect(wrapper.find('.CategoryOption').prop('value')).toBe(category.categoryId);
});
