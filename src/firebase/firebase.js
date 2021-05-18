import firebase from 'firebase';
import 'firebase/database';

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase - Making our Database Connection
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default};

/**********************************************************************************************************************************************************************************/
// Ep.162: Login Page & Google Authentication - Firebase Google Auth. Setup
// Firebase Authentication Documentaion: https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider
// 1. const googleProvider = new firebase.auth.GoogleAuthProvider();
//  - Setup & Export a Google Authentication "Provider" via Firebase (i.e. Twitter, Facebook, Google, etc...)
//  
// 2. Within 'app.js': We are going to run/setup a "Callback" => To check if "Firebase" actually log-in or the User log-out
//   (We will be going back to refactor later => Just want to log if a successful login/logout functions works)
//  - 1st: import { firebase } from './firebase/firebase';
//  - 2nd: firebase.auth().onAuthStateChange(() => { })
//       - Calling '.auth()' as a function => To get all of the "Authentication" related functionality/methods
//       - Method '.onAuthStateChanged((user) => { })' : A Callback Function that runs when the "Authentication State" has Changed => (When a user goes from "Authenticated => Un-authenticated" OR "Un-authenticated => Authenticated")
//                                                     - if (user) { console.log('log in); } else { console.log('log out'); }  
//                                                     - If there is a "User" => The 'user' is provided as the "1st Parameter" of the "CallBack Function()"
//                                                                     
// 3. Within our "/src/actions/" Directory => Create an 'auth.js' file 
//  - Step 1: const startLogin = () => { return () => { } }
//          - Create our 'startLogin()' function => That returns a Function()
//  - Step 2: () => { return firebase.auth().signInWithPopup(googleAuthProvider); }
//          - firebase.auth().signInWithPopup(googleAuthProvider); => Allow user to login with a "Google Related Services" and display a lil "Pop-up System" => Where the user pick the account & login => & Then Authenticated
//          - Within the "Returned Function()" => We are going to 'return' the "Promise Chain" => Allowing other to attach onto it
// 
// 4. Within "components/LoginPage.js": 
//  - 1st: import { connect } from 'react-redux'; => (To use "Map Dispatch To Props" => Since we would want to "Dispatch" 'startLogin'
//         import { startLogin } from '../actions/auth.js; 
//
//  - 2nd: const mapDispatchToProps = (dispatch) => ({ startLogin: () => dispatch(startLogin()) })
//       - Setup 'mapDispatchToProps'
//       - Passing in/Accessing (dispatch) =>
//       - Returning: Our "Prop Object{}" => with 'startLogin' Property => as a Function() call "Dispatching" our 'startLogin()' function
/**********************************************************************************************************************************************************************************/

// child_removed event => Going to fire when one of our 'expenses' get deleted
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// child_changed Event =>
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// child_added Event
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// Ep.150: Challenge
// 1. Setup a Subscription to 'expenses' => using ref().one('value');
// 2. When the data changes => Convert the 'expenses' "Object List" from Firebase to an "Array[]" => & Print it to the screen

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log(expenses);
// }, (e) => {
//     console.log('Error with data fetching...', e);
// });

//******************************************************************************************************************************************************************************************************************************************
// Parsing a Fetched "Array[]" from Firebase
//******************************************************************************************************************************************************************************************************************************************
// database.ref('expenses').once('value').then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log(expenses);
// });



// Challenge
// 1. Setup "expenses" with three items (desciption, note, amount, createdAt)
// database.ref('expenses').push({
//     description: 'Coffee',
//     note: '',
//     amount: 300,
//     createdAt: 100
// });

// database.ref('notes/-M_NvUtD0qEGmq8xqeHX').remove();

// database.ref('notes').push({
//     title: 'Course Topics',
//     body: 'React Native, Angular Python'
// });

// const firebaseNotes = {
//     notes: {
//         asdf: {
//             title: 'First note!',
//             body: 'This is my note'
//         },
//         defg: {
//             title: 'Another note!',
//             body: 'This is my note 02'
//         }
//     }
// };

// const notes = [{
//     id: '12',
//     title: 'First note!',
//     body: 'This is my note'
// }, {
//     id: '761ase',
//     titel: 'Another note!',
//     body: 'This is my note 02'
// }];

// database.ref('notes').set(notes);
// database.ref('notes/12')

// Challenge: Setup Data Subscription
// 1. Print: Andrew is a Software Developer at Amazon.
// 2. Change the data and make sure it reprints
// database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} ${val.job.company}`);
// }, (e) => {
//     console.log('Error with data fetching...', e);
// })

// setTimeout(() => {
//     database.ref('name').set('Leeroy Jenkins')
// }, 3500);

// Fetching Data & Subscribing to Changes
// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// }, (e) => {
//     console.log('Error with data fetching...', e);
// });

// setTimeout(() => {
//     database.ref('age').set(29);
// }, 3500);

// setTimeout(() => {
//     database.ref().off(onValueChange);
// }, 7000);

// setTimeout(() => {
//     database.ref('age').set(30);
// }, 10500);

// Fetching Data Once
// database.ref('location').once('value').then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
// }).catch((e) => {
//     console.log('Error fetching data', e);
// })

// database.ref().set({
//     name: 'Tyler Durden',
//     age: '99',
//     stressLevel: 6,
//     job: {
//         title: 'Software developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'Philadelphia',
//         country: 'United State'
//     }
// }).then(() => {
//     console.log('Data is saved');
// }).catch((e) => {
//     console.long('This faild.', e);
// });

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// });

// database.ref('age').set(27);
// database.ref('location/city').set('New York');

// database.ref('attributes').set({
//     height: 73,
//     weight: 150
// }).then(() => {
//     console.log('Second set call worked!');
// }).catch((e) => {
//     console.log('Things didnt work for the second error.', e);
// });

// Remove 'isSingle' from the database
// database.ref().remove().then(() => {
//     
// }).catch((e) => {
//     console.log('Remove failed: ', e);
// })

// Remove data using '.set()'
// database.ref('isSingle').set(null)


// console.log('I made a request to change the data.');

/**
* Ep.145: Promises with Firebase -
* - Documentation: firebase.google.com/docs/reference -> JavaScript -> Database (.database()) -> Reference (.ref())
*                - Shows you everything your Firebase Objects{} can use such as methods (.database(), .ref(), etc...)
*                  
* 1. Firebase '.set()' => Returns a "Promise"
*  - This means that we can continue chaining our '.then()' & '.catch()' methods
*/

/**
* Ep.146: Removing Data from Firebase
* 1. '.ref('isSingle').remove()' : To remove a "Reference" of a data
*
* 2. Using '.set()' to remove data (Alternative Method): 
*  - When you want to remove data using '.set()' => You just pass in 'null' as the value
*    Ex. database.ref('isSingle').set(null);
*/

/**
 * Ep.147: Updating Data from Firebase
 * 1. Method: .update() - With the 'update()' Method => We pass in an Object{} to update our data
 * 
 * 2. NOTE: We can also add a "Brand New" Property using .update({ })
 *          Ex. database.ref().update({ name: 'Mike', age: 29, job: 'Software Developer' });
 * 
 * 3. NOTE: We can also delete other "Data Values/Property" => By setting their "Data Value" to 'null'
 *          Ex. database.ref().update({ name: 'Mike', age: 29, job: 'Software Developer', isSingle: null });
 * 
 * 4. IMPORTANT NOTE: Our "Update Object" that we provide will ONLY update at the "Root Level" => This means that "Nested Data/Object" will get "Set" instead on being "Updated"
 *                    Ex. database.ref().update({ job: 'Manager', location: { city: 'Boston' } });
 * 
 *  - To update "Nested Data Object" => We have to provide the "Reference Location" as the "Key" => using '/' Forward Slash (Wrapped in '' qoute)
 *    Ex. database.ref().update({ job: 'Manager', 'location/city':  'Boston' });
 */

/**
 * Ep.148: Reading/Fetching Data from Firebase - (There are 2 ways we can "Fetch Data")
 * 1. ref.once(); - "Fetch Data" on a "Specific Reference" a single time
 *  - 1st Argument: 'Event Type' : Strng
 * 
 *  - NOTE: once(); Returns a "Promise" => But also returns some data back within our .then(() => {}) "Callback Function Argument" called "Snapshot"...
 *        - We can then extract the "Snapshot Data Object{}" by using '.val()' => It returns the data we requested
 *          We can then print the data to the screen...
 *        - Ex. ref.once().then((snapshot) => { const val = snapshot.val(); console.log(val) }).catch((e) => { })
 * 
 * 2. ref.on(); - We can also "Fetch Data" => But set up a "Subscription"/"Subscribe to Changes" (It like saying "Give me the values, but also let me know if the values ever changes")
 *  - 1st Argument: 'Event Type' : String
 *  - 2nd Argument: (snapshot) => { } : Callback Function => The "Callback Function"/Success Handler provides us with a "Snapshot" to run some code within the function body
 *  - 3rd Argument: (e) => {} : Passing in a function to notified us of any "Errors"
 * 
 *  - NOTE: ref.on('value', () => { }) => Actually returns back its own "Callback Function()"
 * 
 *  - NOTE: We cannot run "Promises" within each "Callback Function" data changes...
 *          Because "Promises" can only be "Resolved" or "Rejected" a single time with a single value
 *  
 *  - NOTE: For our "Success Reporting" => We use the 2nd Snapshot Callback Function to see if our "Snapshot" returned as anything
 *                  "Error reporting" => We use the 3rd Argument Function from ref.on()
 * 
 * 3. ref.off(); - To unsubscribe/remove all subscriptions
 * 
 * - NOTE: ref.on('value', () => { }) => Actually returns back its own "Callback Function()"
 * 
 * - So to "Unsubscribe" to a specific "Subscription" => We can Define/Set a variable to our ( database.ref().on('value', (snapshot) => { }); )...
 *   And call ref.off() => Passing in our ref.on('value', () => { }) "Callback Function" => Since ref.on('value', () => { }) => Actually returns back its own "Callback Function()"
 *   Ex. const onValueChange = database.ref().on('value', (snapshot) => { });
 *       database.ref().off(onValueChange)
 */

/*****************************************************************************************************************************************************
* Ep.149-150: Array Data in Firebase - List Based Data
* 1. Firebase does NOT support Arrays[] => If we ref().set() and Array[] onto Firebase => It will convert it into an Object{}
*
* NOTE: We have to think differently about our List/Array[] Data Format
*     - Anytime we want to an Array to be set on Firebe => We would have to convert it into an Object{}
*     - We would have a unique 'ID' for each item => And its values/properties would also be an Object{}
*
* 2. ref().push() : 
*  - When we use ref().push() => Firebase is automatically going to create a "New Property" on a "Reference" => Generating a "Unique ID" => With our data inside as "Object Properties"
* 
* 3. Converting Fetched Object List from Firebase - Documentation: https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
*  - snapshot.forEach(): Itterate through a list of Object from a "Reference" & provide us a "Child Snapshot" from its "Callback Function() Argument" 
* 
*  - NOTE: DataSnapshot also provide a Property called 'key' => which gives us the "Text Value" for the "Reference" that we are looking at
*  - childSnapshot.key: Can give us access to the "Unique Generated ID" from a "Pushed Array[] List" on Firebase
******************************************************************************************************************************************************/
