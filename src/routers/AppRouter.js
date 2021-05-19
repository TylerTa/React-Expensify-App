// Dependencies Library Import
import React from 'react';
import { Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import { createBrowserHistory } from 'history'; 
// Components Import
import AddExpensePage from '../components/AddExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PulicRoute';

export let history = createBrowserHistory();

const AppRouter = () => ( 
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}/>
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

/**********************************************************************************************************************************************************************************/
// Ep.164 - Redirecting User Login/Logout
// 1. Make a few changes to our <AppRouter /> => Grabbing the 'history.push()' API "Outside" of the context of a "Component"
//  - NOTE: 'history' is passed into a <Component /> => Because of a "Component" has been "registered/connected" with a { Route } form 'react-router-dom'
//
//  - NOTE: By using <BrowserRouter> </BrowserRouter> => Behind the scene 'react-router-dom' is create & using "Browser History" by default and is => "Registering" it with our "Router"
//        - We can actually go through this process "manually" => We would have to install a tool/module that 'react-router' is already using behidn the scene => Called "npm  history" & add some lines of code
//
// 2. Install NPM "history" ->
//  - 1st: import createHistory from 'history/createBrowserHistory'; 
//  - 2nd: const history = createHistory()
//       -Creating "New History" that we pass down to 'react-router'
//
// 3. Replace <BrowserRouter></BrowserRouter> => With our regular <Router></Router>
//  - NOTE: When we make this switch => We're allow to provide a 'history' Prop => Passing down our own 'history' values (That we declared above)
//  - 1st: <Router history={history}>
//
// 4. export const history = createHistory(); => Now we have access to the 'history' variable => Where we can "Export" it to be use in other files
//
// 4. Within our src/app.js
//  - 1st: import AppRouter, { history } from './routers/AppRouter';
//       - Add an import for our "Named Export" 'history' along side of our "Default Export" 'AppRouter'
//       - Now we have access to 'history' that we passed down to our <Router /> Component => We can use 'history.push()' to navigate between pages
/**********************************************************************************************************************************************************************************/