import React from 'react'; 
import ReactDOM from 'react-dom';
import  { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter';

// Create Store Imports
import configureStore from './store/configureStore';

// Action Generator Imports
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';

// Selectors Imports
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// Render a "Loading Message" until => We get data from Firebase
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// Dispatch a fetch to our database => Which 'return' a "Promise"
// - '.then(() => { }): On "Success" / .then(() => { }) => We render the application
store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'));
});


