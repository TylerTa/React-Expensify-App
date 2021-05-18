import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage }  from '../../components/LoginPage';
import { startLogout } from '../../actions/auth';

// let wrapper, startLogin;

// beforeEach(() => {
//   startLogin = jest.fn();
//   wrapper = shallow(<LoginPage startLogin={startLogin}/>);
// });

test('should correctly render LoginPage', () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

// <Login Page /> Test file -> 'should call startLogin on button click'
test('should call startLogin on button click', () => {
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});