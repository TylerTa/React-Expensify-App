import React from 'react';
import { connect } from 'react-redux'; // Use the "Redux Store" => 'state.auth.uid' => To determin wheter or not the use is authenticated
import { Route, Redirect } from 'react-router-dom'; // 

// export const PublicRoute = (props) => (
//   !props.isAuthenticated ? 
//     <div>
//       <Route {...props}/>
//     </div>
//   : <Redirect to="/dashboard" />
// );

export const PublicRoute = ({ isAuthenticated, component: Component, ...rest}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <Component {...props} />
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);