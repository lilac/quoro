import React from 'react';
import { shallow, mount } from 'enzyme';
import Navbar from './navbar';

test('Renders navbar itself', () => {
  const wrapper = shallow(<Navbar />);
  expect(wrapper.find('.Navbar').length).toBe(1);
});

test('Renders title with provided text', () => {
  const wrapper = shallow(<Navbar title={'title'} />);
  expect(wrapper.find('.Navbar-title').exists()).toBe(true);
  expect(wrapper.find('.Navbar-title').text()).toBe(wrapper.instance().props.title);
});

test('Renders username with provided username', () => {
  const wrapper = shallow(<Navbar username={'username'} />);
  expect(wrapper.find('.Navbar-username').exists()).toBe(true);
  expect(wrapper.find('.Navbar-username').text()).toBe(wrapper.instance().props.username);
});

test('Renders SearchBox inside', () => {
  const wrapper = mount(<Navbar />);
  expect(wrapper.find('.SearchBox').exists()).toBe(true);
});
