import React from 'react'; 
import ReactDOM from 'react-dom';
import  { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter';

// Components Imports
import LoadingPage from './components/LoadingPage';

// Create Store Imports
import configureStore from './store/configureStore';

// Action Generator Imports
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';

// Selectors Imports
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { firebase } from './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

/**
 * func: renderApp - Manages when we render the app to the screen & to avoid running 'ReactDOM.render()' multiple time => Which re-render the app
 * 1. 'hasRendered': Starting off at 'false' => Saying "We have NOT Rendered"
 * 2. 'renderApp()': Checks if we have NOT Rendered => setting switching 'hasRendered' => True
 *                - Render the app
 *                - Set hasRendered = true;
 */
let hasRendered =  false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

// Render a "Loading Message" until => We get data from Firebase
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {  
    store.dispatch(login(user.uid));
    // Dispatch a fetch to our database => Which 'return' a "Promise"
    // - '.then(() => { }): On "Success" / .then(() => { }) => We render the application
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      // Re-direct the user to the <DashboardPage /> => "ONLY" if they're are on the "/" root <LoginPage />
      // NOTE: 'history.location.pathname' - Give us access to our "Current Page" as well
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  }else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
