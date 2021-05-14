import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const editExpenseAction = editExpense('id123', { note: 'New note value' });
  expect(editExpenseAction).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'id123',
    updates: { note: 'New note value' }
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

/******************************************************************************************************************************************************/
// Ep.153-154: Testing Async Redux Action
// Adding New Test Cases: For the New Asynchronus Action Generator - Connected with Firebase
// 1. Install Library: redux-mock-store - Allows us to create a "Mock/Fake Redux Store" to make correct Assertions for testing
// 
// 2. import configureMockStore from 'redux-mock-store';
//    import thunk from 'thunk'; - (Need to use middleware since we are testing dispatching a function as well.)
//
// 3. createMockStore = configureMockStore([thunk])
//  - Initilizing the "Configuration" for our "Mock Store" => Passing in an Array[] of "Middleware" that we want to use (i.e. thunk)
//
// 4. const store = createMockStore({})
//  - Creating our "Mock Store" => Passing to it the "Default Data/State"
//
// NOTE: At this point, our Asynchonous Action is going to run => Question is: How are we going to do something when it's done running???
//     - The Goal: Is to wait until everything is complete => Waiting for the "Firebase/Database" call to actually finish
//     - SOLUTION: "Promise Chaining" - The ability to use "Chain Calls" on "Promises" (See playground/promises.js for examples)
//
// NOTE: Question: Where do we attach our '.then(() => { })' => How do we attach '.then(() => { })' to anything?
//     
// 5. Edit/Refactor 'expense.js' to "Return" our 'database.ref('expense').push(expense).then((ref) => { });'
//  - By "Returning" the "Promise" from 'expense.js' => We can continue to "Promise Chain" over in our "expenses.test.js"  
//
// NOTE: When we are working with "Asynchronous Test Cases" in JEST => We need to tell JEST a given "Test" is "Asynchronous"
//     - We do this by Provide/Passing in an "Argument" called 'done' to our 'test(' ', (done) => { })' Callback Function
//       This "Test Case" will NO LONGER going to be considered a "Success or Fail" => Until AFTER we call 'done()'
//     - This will have the affect of => Forcing JEST to wait until
//
// NOTE: Library redux-mock-store: store.getActions() => Returns an Array[] List of all of the "Actions"
//
// 6. Declare our Assertion => Expecting something from the Actions
//
// 7. Add on another Assertion: Fetch data (by ID) from firebase & see if it was actually saved in our Database
//  - 1st: import database from '../../firebase/firebase';
//  - 2nd: database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => { }) 
//       - We have access ID because => We have access to the 'action[0].expense.id' Object{}
//       - Use '.once('value')' to get the value a single time
//       - Attach a '.then((snapshot) => { }) listener => Grabbing the 'snapshot'
//  - 3rd: expect(snapshot.val()).toEqual(expenseData);
//       - Within our '.then((snapshot) => { })' Callback Function => We grab the 'snapshot' => & Then convert it over to a regular "value"
//       - Make an Assertion about the data
//       - NOTE: This "Callback" is going to be Asynchronous => So if we want to wait for this to complete before doing anything else 
//               We have call 'done()' inside of our Callback Function too.
// 
// NOTE: What we are doing right now has a lot of "Callback Nesting" => Which can be pretty nasty as you add more and more "Callbacks"
//       We can avoid this with "Promise Chaining"
//
// NOTE: Currently we are manipulating our "Production Application Database"
//     - Later we will create & setup a separate "Test Database"
/******************************************************************************************************************************************************/

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();

    // Assertion about the Action
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    // Assertion: If the expense was added to the database => By fetching the data from the database and compare it to the 'expense{}' Object that we passed up

    // Original Code (Working): "Callback Nesting" Syntax Example
    // database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
    //   expect(snapshot.val()).toEqual(expenseData);
    //   done();
    // });

    // Refactored Code (Working): Promise Chaining Syntax
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', () => {
  const store = createMockStore({});
  const expenseDefaultData = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();

    // Assertion about the Action
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaultData
      }
    });

    // Assertion: If the expense was added to the database => By fetching the data from the database and compare it to the 'expense{}' Object that we passed up
    // Refactored Code (Working): Promise Chaining Syntax
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaultData);
    done();
  });
});


/******************************************************************************************************************************************************/
// Old Code: Before Firebase Connection (Setting up Defaults: comes from 'startAddExpense()')
/******************************************************************************************************************************************************/

// test('should setup add expense action object with provided values', () => {
//   const expenseData = {
//     description: 'Rent',
//     amount: 109500,
//     createdAt: 1000,
//     note: 'This was last month rent'
//   };

//   const action = addExpense(expenseData);

//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       ...expenseData,
//       id: expect.any(String)
//     }
//   });
// });

// test('should setup add expense action object with default values', () => {
//     const action = addExpense();

//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });