import { shallow } from 'enzyme';
import React from 'react';
import { app as App } from './app';

const user = { username: 'primosdace' };

test('Renders App', () => {
  const wrapper = shallow(<App user={user} />);
  expect(wrapper.find('.App').length).toBe(1);
});

test('While no user in props, renders loginBox component', () => {
  const wrapper = shallow(<App />);

  expect(wrapper.prop('user')).toBe(undefined);
  expect(wrapper.find('.App').length).toBe(0);
});

test('Renders passed components', () => {
  const wrapper = shallow(<App user={user}><div className="passed" /></App>);
  expect(wrapper.find('.passed').length).toBe(1);
});
