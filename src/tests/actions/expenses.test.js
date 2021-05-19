import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, startEditExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });

  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });

    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
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

test('should edit expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = {
    description: "Doge Coin"
  };
  
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().description).toBe(updates.description);
    done();
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
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

    // Original Code (Working): "Promises-Callback Nesting" Syntax Example
    // database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
    //   expect(snapshot.val()).toEqual(expenseData);
    //   done();
    // });

    // Refactored Code (Working): Promise Chaining Syntax
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
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
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaultData);
    done();
  });
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

// Asynchronous Test Cases
test('should fetch the expense from firebase', (done) => {
  // 1. Create our "Mock Store"
  const store = createMockStore(defaultAuthState);

  // 2. Go through the process of making a "Request"
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();

    // 3. Assert something about the action that were dispatch
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    // 4. Call 'done()' because this is an "Asynchronouse Test Case"
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

/******************************************************************************************************************************************************/
// Ep.157: Fetching Expenses/Data from Firebase
// 1. Within our expenses.test.js: 
//  - Step 1: Set up a '.beforeEach{}' => To grab our "Fixtures/Test" Expenses Data => & and parse it into a format to '.set()' it in our Database
//  - NOTE: Our Asynchronous call to '.set()' our 'expensesData' might not "Wait" for our '.forEach(() => { })' callback function to finish...
//          So we have to pass in 'done' and call it after our '.set()' database call. 
//  
// 2. Within actions/expenses.js: We are going to be adding 2 new exports
//  - setExpense(): Our action that => Has our 'expenses[]' value from the database & will set/change our store/state
//  - startSetExpense(): "Asynchronous Action" that will fetch that data from database => & dispatch 'setExpense()'
//
//  - Step 1: Create/Declare our 'setExpense()' Action Generator
//  - Step 2: Within "expenses.test.js": We can go ahead and add a "Test Case" => Making sure we get the expected uniform "Action Object" structure back
/******************************************************************************************************************************************************/

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