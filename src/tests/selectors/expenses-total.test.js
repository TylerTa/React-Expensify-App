import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';
// import numeral from 'numeral';
// import { getExpensesTotal } from '../../selectors/expenses-total';

test('should return 0 if no expenses', () => {
    const res = selectExpensesTotal([]);
    expect(res).toBe(0);
});

test('should correctly add up a single expense', () => {
    const res = selectExpensesTotal([expenses[0]]);
    expect(res).toBe(195);
});

test('should correctly add up a multiple expenses', () => {
    const res = selectExpensesTotal(expenses);
    expect(res).toBe(114195);
});

// Original Challenge Code
// test('should return 0 if no expenses', () => {
//     const expensesTotal = getExpensesTotal([]);
//     expect(expensesTotal).toBe('$0.00');
// });

// test('should correctly add up a single expense', () => {
//     const expensesTotal = getExpensesTotal([expenses[1]]);
//     expect(expensesTotal).toBe('$1,095.00');
// });

// test('should correctly add up multiple expenses', () => {
//     const expensesTotal = getExpensesTotal(expenses);
//     expect(expensesTotal).toBe('$1,141.95');
// });