import React from 'react'; 
import ReactDOM from 'react-dom';
import  { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter';

// Create Store Imports
import configureStore from './store/configureStore';

// Action Generator Imports
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';

// Selectors Imports
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
