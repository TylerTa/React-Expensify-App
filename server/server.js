const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up! on a Static Port: 3000');
});

/**
 * This is a file we're going to run from the "command line" using the "node terminal command"
 * 
 * Express Documentation: https://expressjs.com/en/4x/api.html
 * 
 * 1. Load in "Express" & Create a new Express Application
 *  - const express = require('express');
 *  - const express = require('express');
 * 
 * 2. Customize it by telling it where our files lives & also have to tell it what "Port" it should listen on
 *    Start by telling it to serve up the "Public Folder" and everything inside
 *  - 1st: app.use(); - Is one way we can customized our "Express Server"
 *                      We are going to be using this to register some middleware 
 *                    - Middleware: Something the runs for each request (Ex. If someone want to make a request to the server => We might want to run some code to serve up some assest from the public directory or log something to the screen)
 *  - 2nd: app.use(express.static(publicPath));
 *       - express.static(publicPath): Takes an argument => Which is the "Path" to the "Public Folder"
 *       - We are going to be using the built in 'path' module => To set up our "Public Path" => 
 *         Ex. const publicPath = path.join(__dirname, '..', 'public');
 * 
 *  - 3rd: Start up the server using 'app.listen()' => Passing in a port for our server to listen to
 *       - 1st Argument: For now we are going to use "Port: 3000" => A Port available for all operating systems without getting any warning from your OS System
 *       - 2nd Argument: A "Callback Function() => {}" that just gets called when the server is up => So we can just log a simple message to the screen
 * 
 * 3. Over in the Terminal => We are going to run our "node script file" 
 *    Ex. node server/server.js
 *    NOTE: Remember to 'yarn run build:prod' your app first before starting the server => Or else it won't have the assets it need to serve things up properly
 *    ISSUES: At the moment if we traverse to a different page of our app and hit the "Refesh" button => It will not be able to be found
 *            This is because there is NO /create file or folder inside of public.
 *    SOLUTION: We need to make sure to serve up "index.html" for all files that DON'T have a "Match" => This makes sure that our "Browser Router" still works
 *            - This is something we did inside of our webpack.config.js -> { devServer: { historyApiFallback: true } } 
 * 
 *  - Ex. app.get('*', (req, res) => { res.sendFile(path.join(publicPath, 'index.html')); });
 * 
 * Recap: Setup our 15 line Express Server
 * 1. Create our Express Server
 * 2. Tell it/Point it to use the "Public" Directory/Folder => To serve up all of our static assests
 * 3. Setup: If what is requested isn't in the "Public Folder" => Then just send/give them back our "index.html"
 * 4. Setup: Point our Express Server to startup on Port: 3000
 */

/**
 * Heroku Setup
 * 1. Setup Dynamic Port from Heroku
 * 2. 
 */

/**
 * Regular Vs. Development Dependencies
 * ISSUE: Dependencies like (enzyme, live-server, webpack-dev-server, etc...) are thing that are currently getting install on Heroku => Even though Heroku is NOT taking advantage of them
 * SOLUTION: Create 2 Sections of "Dependencies"
 *         - We can create "Dependecies" that are install "Locally" & get install on "Heroku"
 *           But we can also create a separate "Dev Dependencies" section => Those Dependencies will only get install "Locally"
 * 
 * 1. Install 'chalk' via YARN, but adding on a '--dev' flag => To install it as a "Development Dependencies" => Ex. yarn add chalk --dev
 *  - '--dev': flag will add a { devDependencies } section within our 'package.json' file
 * 
 * 2. Move: our (enzyme, enzyme-to-json, jest, react-test-renderer, webpack-dev-server) dependencies onto our { devDependencies } section
 *  - Remove: (live-server) & its 'scripts: { "serve": "live-server public/" }' from our dependencies => Because it's something that we're not going to use anymore
 * 
 * QUESTION: How to we choose to install one or the other???
 * ANSWER: By deleting our "node_modules" folder...
 *       - We can run: yarn install --production => This tell YARN to only install the "Regular Dependencies" & to leave off the "Dev Dependencies" 
 *         If we check our new "node_modules" folder => We will see that whatever was in our { devDependecies } section will NOT be included
 * 
 * 3. Locally we will use 'yarn install' => To install both our "Regular Dependencies" & "devDependencies" 
 * 
 * 4. Create a separate 'dist/' Directory/Folder => To have "webpack" dump all of our (bundle.js, bundle.js.map, styles.css, styles.css.map) "Generated Assets" files into our 'dist/' directory
 *  - To manage this: We are going to make some one-line tweak/edit to our "webpack.config" => changing where the generated files gets outputted
 *                    Making changes to "index.html"
 *  - 1st: "index.html" - Change the source location of our 'bundle.js' => Ex. src="/dist/bundle.js"
 *                      - Change the 'href' location of our 'styles.css' => Ex. href="/dist/styles.css"
 *  - 2nd: "webpack.config.js" - The { output: { path: } } => Tells webpack where to dump all of our "Generataed Assest" files
 *                             - Change the "output path" to => { output: { path: path.joing(__dirname, 'public', 'dist') } }
 * 
 *  - NOTE: Since we're changing where the "Generated Assets" file is outputted/end up...
 *          We also need to make an tweak/edit to the { devServer: }
 *        - Atm the { devServer: } is looking for the "Assets" file in the "root" of the "/public" folder
 * 
 *  - 3rd: "webpack.config.js" - { publicPath: } lets you specify where the "Generated Bundled Assets" should live
 * 
 *  - NOTE: When running our 'yarn run dev-server' => { devServer: } never write to the "File Systems" => So we will NOT see the '/dist/' directory within our VSCode
 *        - When running our 'yarn run build:prod' => We WILL see our "Bundled Assets" files get written onto the '/dist/' directory/folder
 *        - Wrapping this up by running 'yarn run start' => To run our "node server/server.js" => to make sure that they acutally work as expected
 * 
 */