import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

// let wrapper, startLogout;

// beforeEach(() => {
//   startLogout = jest.fn();
//   wrapper = shallow(<Header startLogout={startLogout}/>);
// });

test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {}} />);
    expect(wrapper).toMatchSnapshot();
});

// Test Case: Making sure the correct "Props" gets called when we click the [Logout] button 
test('should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout}/>);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});

