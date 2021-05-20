import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

// Named Export: <LoginPage /> Component
// - Deconstructed 'startLogin' from our "Prop Object{}" passed in
// - Setup 'onClick': Referencing our 'startLogin' function
export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It's time to get your expenses under control.</p>
      <button className="button" onClick={startLogin}>Login with Google</button>
    </div>
  </div>
);

// Map/Passing in 'startLogin' as a prop => The will "Dispatch" the 'startLogin()' Action
const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

// Exporting our "Connected" <LoginPage /> Component
export default connect(undefined, mapDispatchToProps)(LoginPage);

/**********************************************************************************************************************************************************************************/
// Ep.162: Login Page & Google Authentication - Firebase Google Auth. Setup
// 4. Within "components/LoginPage.js": 
//  - 1st: import { connect } from 'react-redux'; => (To use "Map Dispatch To Props" => Since we would want to "Dispatch" 'startLogin'
//         import { startLogin } from '../actions/auth.js; 
//
//  - 2nd: const mapDispatchToProps = (dispatch) => ({ startLogin: () => dispatch(startLogin()) })
//       - Setup 'mapDispatchToProps'
//       - Passing in/Accessing (dispatch) =>
//       - Returning: Our "Prop Object{}" => with 'startLogin' Property => as a Function() call "Dispatching" our 'startLogin()' function
/**********************************************************************************************************************************************************************************/
  
