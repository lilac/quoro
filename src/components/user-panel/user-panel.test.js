import React from 'react';
import { shallow } from 'enzyme';
import { UserPanel } from './user-panel';

describe('UserPanel', () => {
  const props = {
    questions: [],
    user: {
      token: '123',
      username: 'username',
      id: 123,
    },
    getUserQuestions() {},
  };

  test('renders', () => {
    const wrapper = shallow(<UserPanel {...props} />);
    expect(wrapper.find('.UserPanel').exists()).toBe(true);
  });

  test('componentWillMount() calls getUserQuestions()', () => {
    const getUserQuestions = jest.fn();
    const specificProps = Object.assign({}, props, {
      getUserQuestions,
    });
    const wrapper = shallow(<UserPanel {...specificProps} />);
    expect(getUserQuestions).toHaveBeenCalledTimes(1);
    expect(getUserQuestions).toHaveBeenCalledWith(props.user.id);
  });
});
