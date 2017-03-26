import React from 'react';
import { shallow } from 'enzyme';
import { Categories } from './categories';

test('Renders correctly', () => {
  const wrapper = shallow(<Categories fetchCategories={() => {}} categories={[]} />);
  expect(wrapper.find('.Categories').exists()).toBe(true);
});

test('componentWillMount() calls fetchCategories()', () => {
  const fetchCategories = jest.fn();
  const wrapper = shallow(<Categories fetchCategories={fetchCategories} />);
  expect(fetchCategories).toHaveBeenCalledTimes(1);
});

test('When no categories provided, returns null', () => {
  const wrapper = shallow(<Categories fetchCategories={() => {}} />);
  expect(wrapper.type()).toBe(null);
});
