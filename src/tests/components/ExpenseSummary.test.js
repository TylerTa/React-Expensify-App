import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';

import expenses from '../fixtures/expenses';

/**************************************************************************************/
// Original Working Test Code:
// Snapshot Test #1: Viewing 1 expense totalling $45.00
test('Viewing 1 expense totalling $45.00', () => {
    const wrapper = shallow(<ExpenseSummary expenses={[expenses[2]]}/>);
    expect(wrapper).toMatchSnapshot()
});

// Functional Component Failed Attempt
// test('Viewing 1 expense totalling $45.00', () => {
//     const wrapper = shallow(ExpenseSummary({ expenses: expenses[2]}));
//     expect(wrapper).toMatchSnapshot()
// });

// Snapshot Test #2: Viewing 2 expense totalling $1,140.00
test('Viewing 2 expenses totalling $1,140.00', () => {
    const wrapper = shallow(<ExpenseSummary expenses={[expenses[2], expenses[1]]}/>);
    expect(wrapper).toMatchSnapshot()
});