import { shallow } from 'enzyme';
import React from 'react';
import App from './app';

test('Renders App div correctly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.App').length).toBe(1);
});

test('Renders passed children', () => {
  const wrapper = shallow(
    <App>
      <div className="children" />
    </App>
  );
  expect(wrapper.contains(<div className="children" />)).toBe(true);
});

