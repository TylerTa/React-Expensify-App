/**
 * NOTE: Some third-party libraries will already have "Promises" setup/wired up within their codes methods - (i.e. firebase)
 *       What we will be doing is using a lot of "Promises" that gets generated by "Methods Calls" like ( firebase -> '.set()' )
 *
 * - To know if something succeed of fail => We have to access the 'promise' => & Register some "Call Backs"
 *   Ex. promise.then(); : Lets us "Register a Callback" => The "Callback" is going to trigger/fire "when and if" the "Promise Resolved"
 *
 * - promise.then((data) => { }) : promise.then() => Takes a "Callback" function() as an argument
 *                               Within the "Callback" function() Argument => We have access to any 'data' that might have gotten passed to 'resolve()'
 *
 * NOTE: 'promise' - A 'promise' can ONLY 'resolve()' or 'reject()' => A Single Time!!!
 *               - When a 'promise' is "Resolved" or "Rejected" => It means that it cannot make another call to 'resolve()' or 'reject()'
 *
 * NOTE: resolve() & reject() - You can ONLY pass a "Single Argument" to 'resolve()' or 'reject()'
 *                            - If you do need more than more piece of info/data => you can pass an Object{} with multiple properties to 'resolve()'
 *                              Ex. resolve({ name: 'Tyler', age: 99 })
 *
 * NOTE: 'reject()' - When something goes wrong => We call our 'reject()' method
 *                  - Our promise.then((data) => { }) "Callback Function" console.log() only trigger when our 'promise' is "Resolved" => Instead what we get back is an "JavaScript Error"
 *                  - To do something when our 'promise' gets "Rejected" => Add on a call to '.catch()' AFTER our '.then()' method
 *                    Ex. promise.then((data) => { }).catch((error) => { });
 *
 * NOTE: Alternative Syntax - promise.then() => Can actually take in 2 Arguments => & you can use this to daisy-chain the call to our '.catch((error) => { })' method "Callback Function"
 *                          - When you pass a 2nd "Callback Function()" Argument into 'promise.then()' => This will be treated as you "Catch Handler"
 *
 * NOTE: When we work is 'promise' about 90% of the time => We will just be attaching "Handler" to third-party libraries "Promises"
 *       Very rarely will we find ourselves "Creating of own Promises" => Most of the time 'promises' will be created by the library that we are using.
 */

// 1.  We have created a 'promise' that 'resolve()' some data
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
        name: 'Tyler',
        age: 99
    });

    // reject('Something went wrong!');
  }, 5000);
});

console.log('before');

// 2. Waited for thing to 'resolve/complete' => & when they do complete => all we do is dump some data to the screen
// Original Syntax: (Explicit Catch Method) promise.then((data) => { }).catch((error) => { })
promise
  .then((data) => {
    console.log('1', data);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('This is my other promise');
      }, 5000);
    });
  }).then((str) => {
    console.log('does this run?', str);
  }).catch((error) => {
    console.log('error: ', error);
  });

// Alternative Syntax: (Implicit Catch Method) promise.then((data) => { }, (error) => { });
// promise.then((data) => {
//     console.log('1', data);
// }, (error) =>{
//     console.log('error: ', error);
// });

console.log('after');


/******************************************************************************************************************************************************/
// Ep.153: Testing Async Redux Actions - Promise Chaining
// 1. We can "Chain" Promises by => Adding on another '.then(() => {})' call
//  - Only when a Promise "Resolves" => Does the chaining of the '.then(() => {})' Callback Function begin to fire/run
//    NOTE: When we "reject" from a Promise => None of the success cases gets called
//
// NOTE: The 2nd and so forth "Chained" then(() => { }) Callback Function => Does NOT get any data passed to it
//       Unless we "Return" some data from the "Previous" '.then(() => { })' Callback Function
/******************************************************************************************************************************************************/

/******************************************************************************************************************************************************/
// Ep.154: Testing Async Redux Actions - Promise Chaining (Part 2) 
// 1. If we "Return a Promise" => The "NEXT" '.then(() => { })' Callback Function => Turns into the Returned "Promises Success Case" from above
/******************************************************************************************************************************************************/