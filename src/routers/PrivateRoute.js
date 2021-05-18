/******************************************************************************************************************************************************/
// Ep.166: Private Only Routes - User Authentication/Validations
// 
// Step 1. Create a "Named Export" <PrivateRoute /> Functional Component => Returning our 
//
// Step 2. Create our "Connected" Component 'mapStateToProps' => To grab our 'state.auth.uid' values from the "Redux Store"
//       - Return: an Object{ isAuthenticated: !!state.auth.uid } => 
//               - If 'state.auth.uid' exist => we get an "String Value" of the User ID => & "Undefined" if it does NOT exist
//               - We Use '!!' double 'NOT' => To flip 'state.auth.uid' to a boolean value of true/false
//
// Step 3. export default connect(mapStateToProps)(PrivateRoute);
//       - Export a "Default" "Connected" version of our <PrivateRoute /> Component
//
// Step 4. Within our 'PrivateRoute()' Component Function()
//       - 1st: Create an instance of <Route /> as our "Returned JSX" from 'PrivateRoute()'
//       - 2nd: Destructured { isAuthenticated, component: Component, ...rest}
//            - Prop: 'isAuthnticated' => Passed in from our 'mapStateToProps'
//            - Prop: 'component: Component' => Passed in from "AppRouter.js" (Rename component -> Component, because we will be rendering it and would need an "Uppercase Name" for code convention )
//            - Prop: '...rest' Operator: Grabbing the rest of the "Props" passed into <PrivatesRoute /> => Declaring it as a variable 'rest'
//
//            - NOTE: When we're "Creating" an Object{} => We can use the '...spread' Operator to spread out an Object{} => To spread out all of its Properties
//                    When we're "Destructuring" an Object{} => We can use the '...rest' Operator: to get a "Variable" called 'rest' => With "All" of the stuff/Properties that we Did NOT "Destructured"
//                   (NOTE: 'rest' is just a Variable Name => We can call it'...props' or anything else)
//
//       - 3rd: Within our "Return" <Route /> Component => We Pass down the necessary "Props"
//            - Prop: {...rest} => The rest of our "Props" that we did NOT "Destructured" => Passed in from <PrivateRoute />
//            - Prop: component={(props) => { }} => Is Where we are defining our "Conditional Logic" to determine what <Component /> will get pass into our <Route />
//                                                - We can get all of the (props) povided by default from <Route /> from the Arrow Function Parameter
//                  - Conditional Logic: If 'isAuthenticated' is set/true => We will "Return"/Passing <Component {...props} /> => As the provided <Component /> to <Route />
//                                       Else => We will use a <Redirect to="/" /> Component provided by 'react-router-dom' => To redirect the user to the "/" root/home page
 /******************************************************************************************************************************************************/

import React from 'react';
import { connect } from 'react-redux'; // Use the "Redux Store" => 'state.auth.uid' => To determin wheter or not the use is authenticated
import { Route, Redirect } from 'react-router-dom'; // 
import Header from '../components/Header';


export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div>
        <Header />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);