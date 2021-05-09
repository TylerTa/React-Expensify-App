// import numeral from 'numeral';

// Refactored Code
export default (expenses) => {
    return expenses.map((expense) => expense.amount).reduce((sum, value) => sum + value, 0);
};

//
// export default (expenses) => {
//     if (expenses.length === 0) {
//         return 0;
//     } else {
//         return expenses.map((expense) => expense.amount).reduce((sum, value) => sum + value, 0);
//     }
// };

// Original Challenge Code
// export const getExpensesTotal = (expenses) => {
    
//     let expensesTotal;
//     const expensesLength = expenses.length;

//     switch (expensesLength) {
//         case 0:
//             expensesTotal = 0;
//             break;
//         case 1:
//             expensesTotal = expenses[0].amount;
//             break;
//         default:
//             const expensesAmount = expenses.map((expense) => {
//                 return expense.amount
//             });
//             expensesTotal = expensesAmount.reduce((total, num) => { return total + num; });
//     }

//     return numeral(expensesTotal / 100).format('$0,0.00');
// };

