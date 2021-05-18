import { firebase, googleAuthProvider } from '../firebase/firebase';

/**********************************************************************************************************************************************************************************/
// Ep.162: Login Page & Google Authentication - Firebase Google Auth. Setup
//
// 3. Within our "/src/actions/" Directory => Create an 'auth.js' file 
//  - Step 1: const startLogin = () => { return () => { } }
//          - Create our 'startLogin()' function => That returns a Function()
//  - Step 2: () => { return firebase.auth().signInWithPopup(googleAuthProvider); }
//          - firebase.auth().signInWithPopup(googleAuthProvider); => Allow user to login with a "Google Related Services" and display a lil "Pop-up System" => Where the user pick the account & login => & Then Authenticated
//          - Within the "Returned Function()" => We are going to 'return' the "Promise Chain" => Allowing other to attach onto it
/**********************************************************************************************************************************************************************************/

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};