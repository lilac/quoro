import React from 'react';
import { shallow } from 'enzyme';
import { userPreview as UserPreview } from './user-preview';

describe('UserPreview', () => {
  const props = {
    logOut() {},
    user: {
      avatar: 'avatar',
      username: 'username',
    },
  };

  test('renders', () => {
    const wrapper = shallow(<UserPreview {...props} />);
    expect(wrapper.find('.UserPreview').exists()).toBe(true);
  });

  test('clicking button logs user out', () => {
    const logOut = jest.fn();
    const specificProps = Object.assign({}, props, {
      logOut,
    });
    const wrapper = shallow(<UserPreview {...specificProps} />);
    wrapper.find('.UserPreview-logout').simulate('click');
    expect(logOut).toHaveBeenCalledTimes(1);
    expect(logOut).toHaveBeenCalledWith(props.user.username);
  });
});
