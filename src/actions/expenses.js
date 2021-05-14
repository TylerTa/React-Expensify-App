/**
 * Ep.152: Asynchronus Action Redux
 *
 * 1. Action Generator Recap:
 *  - 1st: component calls action generator
 *  - 2nd: Action Generator returns an Object (Representing the Redux Store State)
 *  - 3rd: Component "Dispatchs" Object
 *  - 4th: Redux Store Changes
 *
 * 2. Asynchronus Action Steps w/ Firebase
 *  - 1st: Components calls Action Generator
 *  - 2nd: Action Generator returns "Function()"
 *  - 3rd: Component "Dispatches" function (?)
 *  - 4th: Function() runs (has the ability to dispatch other actions and do whatever it wants)
 *       - This is where we are going to have our "Firebase Code" (Ex. To use Firebase .push() to add something to the database)
 *       - & Then "Dispatch" another Action => A Standard one that returns an action => Which will manipulate the Redux Store
 *
 * NOTE: Redux itself does NOT allow you to "Dispatch" a Function()
 *     - That's why we will be setting up a "Module" (A piece of Redux Middleware) => That will add support for "Dispatching a Function()""
 *
 * 3. Install & Setup: Redux Thunk
 *  - yarn add redux-thunk@2.2.0
 *
 * 4. Edit our "configureStore.js" file
 *  - 1st: Add 'applyMiddleWare' to our import from 'redux'
 *  - 2nd: Grab the single Default Export from 'redux-thunk' (Ex. import thunk from 'redux-thunk'; )
 *  - 3rd: use 'applyMiddleWare(thunk) as the "2nd Argument" within our createStore()
 *   NOTE: Since we're using the "Redux DevTool" => To perserved its functionality we have to set a Variable = window.__RE__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 *       - & Wrap it around our 'applyMiddleware(thunk)' (Ex. composeEnhancers(applyMiddleware(thunk)) )
 *       - Remember to import 'compose' from 'redux' as well
 *
 * 5. Edit our "firebase.js" file
 *  - Export our { firebace, database as default };
 *
 * 6. Edit our "expenses.js" file
 *  - 1st: Add & Export a new 'const startAddExpense()'
 *       - While 'addExpense()' Returns an "Object{}"" to our "Store"
 *       - 'startAddExpense()': Returns a "Function()" Is going to start the process off => "Dispatching" 'addExpense()' inside of the function() itself
 *                        NOTE: 'startAddExpense()' Returning a Function() only works => Because we set up the "Middleware Thunk" => My Default this would NOT work!!!
 *
 *  - 2nd: Setup the Function() Returned by our 'startAddExpense()'
 *       - NOTE: The "Returned Function()" get called internally by Redux & get called with (dispatch) => This gives us access to use 'dispatch' within our "Returned Function()"
 *       - Step 1: Writing some data to "Firebase" => Waiting for that data to correctly "Sync"
 *       - Step 2: Then we use 'dispatch()' to "dispatch" 'addExpense()' => Making sure the Redux Store reflex the changes as well
 *
 *  - 3rd: Since we are saving to "Firebase" within out "Returned Action Function()" => We want to restucture our "Default Object Value"
 *       - Instead of having the "Default Object{} Value" set in our 'addExpense()' Action Generator => We will be setting it within our "Returned Action Function()"
 *       - Step 1: As the 1st Argument to => We pass in our 'expenseData' and if we dont then we'll set it to an "Empty Object{}"
 *                (Ex. startAddExpense = (expenseData = {}) => { }; )
 *           NOTE: We could setup the "Default Object{} Values" => Inside of the 'startAddExpense()' Function Argument as well => But we will explore an alternative way
 *       - Step 2: Set our "Action Object{} Default Values" => Inside of our "Returned Action Function()" Body
 *               - Create a const { }  Object & "Destructure" stuff from 'expensesData'
 *                (Ex. const { } = expenseData;)
 *               - Set our "Action Object Default Value" within our 'const { }' Object
 *       - Step 3: Access "Firebase" & save some data
 *               - import database from '../firebase/firebase'
 *               - Create a variable for our Object{} that we're trying to '.push()' => (Ex. const expense = { description, note, amount, createdAt }; )
 *               - use 'database.ref('expenses').push(expense).then(() => { })
 *       - Step 4: Dispatch our (addExpense()) passing all of the data => within our '.then(() => { })' Callback Function()
 *               - 'dispatch(addExpense({ }))' : Define our "Action Object{}" within 'addExpense()'
 *               - { id: ref.key } : Grab our unique ID from => 'ref.key'
 *           NOTE: We do need to include the { id } property to our Action Object as well...
 *                 Good news is that the "Succes Case" for '.push()' => Gets called with the "Reference" within our '.then((reference) => { })' Callback function
 *               - '...expense': Spreading out the rest of the "Properties" from our 'expense'
 *
 *  - 4th: Edit our <AddExpensePage.js /> Component file
 *       - Making sure to "Dispatch": 'startAddExpense()' => Instead of 'addExpense()'
 */

import uuid from 'uuid';
import database from '../firebase/firebase';

// Updated: ADD_EXPENSE - Action Generator (Connecting Redux to Firebase)
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    /**
     * Destructuring 'expenseData{}' Syntax
     * 1. Destructuring 'expenseData{}' "Object Properties"
     * 2. Declaring them as 'const' Variables => While assigning/setting "Default Values" (If the Object did not have those Properties)
     */
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    // Creating an 'expense{}' Variable => Setting its Properties from the "Destructured" 'expenseData{}' from above
    const expense = { description, note, amount, createdAt };

    // Adding/Pushing the 'expense{}' to the database
    // - Then: Dispatching 'addExpense()' Action Generator Function to change/add the 'expense' to the Redux Store
    return database
      .ref('expenses')
      .push(expense)
      .then((ref) => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

// REMOVE_EXPENSE - Action Generator
// - Is the user going to be passing in anything? => Yes an "Expense Object{}"
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE - Action Generator
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

/******************************************************************************************************************************/

// Old Code: ADD_EXPENSE (Without Connecting to Redux to Firebase)
// export const addExpense = ({
//     description = '',
//     note = '',
//     amount = 0,
//     createdAt = 0
//   } = {}) => ({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: uuid(),
//       description,
//       note,
//       amount,
//       createdAt
//     }
//   });
