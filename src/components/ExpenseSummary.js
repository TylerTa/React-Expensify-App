// import { render } from 'enzyme/build';
import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import visibleExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';

// Original (Working Code): Class Based Component
export class ExpenseSummary extends React.Component {
    expenseCount = () => {
        return this.props.expenses.length
    }

    total = () => {
        return numeral(expensesTotal(this.props.expenses) / 100).format('$0,0.00');
    }

    render() {
        if(this.props.expenses.length > 1) {
            return (
                <div>
                    <p>{`Viewing ${this.expenseCount()} expenses totalling ${this.total()}`}</p>
                </div>
            );
        }else {
            return (
                <div>
                    <p>{`Viewing ${this.expenseCount()} expense totalling ${this.total()}`}</p>
                </div>
            )
        }
        
    };
} 



// Original Code: (Non-working) Functional Component
// export const ExpenseSummary = (props) => {
//     const expenseCount = props.expenses.length;
//     const total = expensesTotal(props.expenses);

//     return (
//         <div>
//             <p>{`Viewing ${expenseCount} expenses totalling ${total}`}</p>
//         </div>
//     );
// };

const mapStateToProps = (state) => ({
    expenses: visibleExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseSummary);

