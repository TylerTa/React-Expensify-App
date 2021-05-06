// Load in the Built-in Node Module code 'path' by using the 'require()' function
// - This allow us to use 'path.join()'
const path = require('path');

/********************************************************************************************************************************/
// Ep.50: Installing & Configuring Webpack
// 'module.exports': is a Node syntax to expose something to another file (In this case => an Object)
// 1. entry => './src/app.js'
// 2. output => {path: '', filename: 'bundle.js'}
//  - NOTE: 'path' is where this is a bit trickier
//           This need to be the "Absolute Path" on your machine to where to output the Webpack 'bundle.js' file
//  - Problem: We want to put the "Webpack" output file inside of the "public" folder of this project
//    (The tricky thing is that we CAN'T use './' "Relative Path")
//  - Solution: Use a Node Function: 'path.join() to join 2 paths together (__dirname, )
//             '__dirname' is a variable that returns the "Absolute Path" to the current location (For us it will contain the "Path" to the indecision_app folder)
//  - Output directory: We want to put the file inside of the "public" folder
//                      We will use the Node Function 'path.join()' to joing the "Absolute Path (__dirname) with the "Local Path" to the public folder
// Ep.50 Update: 
// 1. We deleted the "script" folder inside of "public/script" (We don't need the app.js file inside of the "scripts" folder anymore)
// 2. We remove all of the <script /> tags inside of our "index.html" file
// 3. Added on a single <script src="/bundle.js"></script> tag that points to our "bundle.js" file
//  - NOTE: '/' is the "Root" of the "Webserver" (Which is our "public" folder)
// 4. Added a '--watch' flag to "Webpack" inside of our "package.json" file to watch and automatically update for code changes
//
// Ep.50 Recap:
// 1. Install "Webpack" locally
// 2. Setup a "Script/command" to run "webpack --watch" inside of our "package.json" file
// 3. Setup our "webpack.config.js" file
//  - Provided "entry": What files I should be taking in? (Note: We were able to provide a "Relative Path" to our file)
//  - Provided "output": Where should I place the new "bundle.js" file (Note: "output" require a lil more configuration grabbing the "Absolute Path")
// 
/********************************************************************************************************************************/

/****************************************************************************************************************************************************/
// Ep.54: Setting up Babel with Webpack - Configure Webpack how compile JSX into regular JavaScript code
// 1. Advance Webpack Technique:
//  - loader: A "loader" lets you customized the behavior of webpack when it's load a given file
//       (Ex. Anytime webpack sees a '.js' file => We can do something with that file => In our case we are going to run it through "Babel")
// NOTE: Think of it as a way to define how a file gets "Transform" when "Webpack" uses it...
//     - We are going to "Transform" it with "Babel" => Converting ES6 -> ES5 & JSX -> Vanilla JavaScript
// NOTE: There are also loader for "SCSS" => Allow us to convert an "SCSS" file down to "CSS"
// 2. Install "babel-core@6.25.0": "babel-core" is very similar to "babel cli"
//  - "Babel-Core" is similar to "Babel CLI": "Babel CLI" allows you to run "Babel" from the commande line => "Babel-Core Module" allows you to run "Babel" from tools with "Webpack"
// 2. Install 'yarn add babel-loader@7.1.1'
//  - "Babel-Loader" allows us to teach "Webpack" how to run babel when webpack see certain files
// 3. Set up "babel-loader" inside of "Webpack" via the 'module.exports' Object property named 'module'
// 4. Webpack 'module.rules' property: This lets you set up an Array[] of rules
//  - The rules lets you define how you want to use your 'babel-loader'
//  (Ex. Have 1 rule to take JSX => convert it to Javascript w/ Babel | 1 rule to take SCSS files => converted to CSS) 
// 5. Withing the module.rules[] Array => each rules within the Array is an "Object" => Within each "Rule Object", we define what we want that rule to be (3 properties we are going to be setting up for the the "Rule Object")
//  - 'loader' => What loader are we trying to use??? (Ex. loader: 'babel-loader')
//  - 'test' => What file do we want to run this "loader" on??? (If we have other file types in our application, we might only want to run it on Javascript files)
//     NOTE: We are using "Regular Expression" to define the type of files we want our 'loader' to process (We are going to target files that ends in '.js')
//      (Ex. 'test: /\.js$/' )
//  - 'exclude': This lets us 'exclude' a given sets of files (In our case: We're going to 'exclude' the entire /node_modules/ folder)
//          (Ex. 'exclude: /node_modules/' )
// NOTE: At this point we told "Webpack" to run "Babel" everytime it sees a '.js' file
// PROBLEM: The only problem is that "Babel" does nothing by default
//        - We have NOT told babel to use the 'env' or 'react' presets
//         (We're able to run the script/command to tell "babel" to use the 'env' & 'react-presets' by providing it via an "argument" => But we no longer have a way of providing those 'preset arguement' via "webpack")
// SOLUTION: Create a separate file to configure "babel" to use the mentioned presets (env & react)
// 6. Create a '.babelrc' file in the root of your project 
//  - This is a JSON file that allows us to take all of the arguments we pass through the command lines and put them the '.babelrc' configuration file
//  - Setup the "presets: ["env", "react"]" Array[] and provide the two items/preset we had provided via the command lines
//
// Recap:
// 1. Learn that we can't use JSX right inside of "Webpack" => without first teaching "Webpack" how to run babel
// 2. We teach "Webpack" to take all of our file the end in '.js' and run it through 'babel-loader' (excluding everything in our 'node_module' folder)
// 3. Setup our '.babelrc' file to define the 'presets' we want babel to use
/****************************************************************************************************************************************************/

/****************************************************************************************************************************************************/
// Ep.56: Source Map with Webpack - Using Source Map to help us trace our error and debug faster
// 1. Set up a 'devtool' property within 'webpack.config.js' 
//  - For Development: We are going to be using 'cheap-module-eval-source-map'
// NOTE: Everytime you edit/change 'webpack.config.js' => you have to restart your build
/****************************************************************************************************************************************************/

/****************************************************************************************************************************************************/
// Ep.57: Webpack Dev Server
// NOTE: Instead of using the generic 'live-server' => We are going to be switching to Webpack 'dev-server' instead
// 1. Install Webpack DevServer => 'yarn add webpack-dev-server@2.5.1
// 2. using its property 'contentBase' => This let us tell 'dev-server' where it can find our "public files/folder"
//  - IMPORTANT: We have to provide the "Absolute Path" to our public folder
//
// UPDATE:
// - Removed our "build-bable" script from 'package.json'
// - Update/Edit our "build" script for from "webpack --watch" => "webpack" (To have it build our bundle.js a single time)
// - Added "dev-server": "webpack-dev-server" script within 'package.json' (Which is the command that webpack-dev-server provided to us)
//   NOTE: We dont have to provide any "arguments" => All of the arguments sit inside of 'webpack.config.js'
//   NOTE: Now we don't need 2 processes running (We don't need 'live-server' and 'webpack --watch') => We can just use "dev-server" to get everything working
// 
// NOTE: "webpack-dev-server" does NOT write & save a new bundle file for us, it compile its own bundle file and reads it from "memory"
/****************************************************************************************************************************************************/

/****************************************************************************************************************************************************/
// Ep.64: Configure Webpack to take in the SCSS => Compile it down to CSS and add it into the application
// 1. Specify a new "rules: [{}] "
//  - rules: [{ test: /\.css$/ }]: to target all files that ends in ".CSS"
// 2. Install & Specify our loaders within Webpack (We're going to be using 2 loaders)
//  - "css-loader" : Allows Webpack to "Read the file in"
//  - "style-loader": Takes the CSS in JavaScript and dump it content to the DOM by injecting a <style> tag
//  - Command Line: 'yarn add style-loader@0.18.2 css-loader@0.28.4'
// NOTE: For our 'babel-loader' "rules" - we specified a {loader: ' ' } => Which specified a "Single Loader"
//     - For our CSS file, we need to run both "css-loader" & "style-loader" => So instead we will be specifying { use: [] }
//     - { use: ['styler-loader', 'css-loader'] }: Allows us to specify an "Array of Loaders"
// 3. Edit/Update our rules: {test: <file-ending-with-REGEX>} to look for '.scss' instead of '.css'
//  - (Ex. rules: [ {test: /\.scss$/ } ]
// 4. Edit/Update our 'styles.css' => to use a feature of SCSS
//  - Renaming the file to '.scss'
// NOTE: SCSS & SASS uses the same tool, but just different way/syntax to write your style code
//     - SCSS: Uses "semi-colon" & "curly-braces"
//     - SASS: Leave off "semi-colon" & "curly-braces"
// 5. Install 'sass-loader@6.0.6' & 'node-sass (One is equivalent to babel-loader and one equivalent to babel-core)
//  - 'sass-loader': Allow us to import the .scss file (babel-loader)
//  - 'node-sass': Take our SASS/SCSS code convert it into regular CSS (babel-core)
// 6. Configure Webpack: to use 'sass-loader' & 'node-sass'
//  - Add our "sass-loader" to our '.scss' 'rules: {use: []}'
//  Ex. rules: [{use: ['sass-loader']}]
// NOTE: Behind the scene the "sass-loader" is going to use "node-sass" to convert the file
//
// RECAP:
// 1. We installed ('css-loader', 'style-loader', 'sass-loader', 'node-sass') => To convert SCSS down to CSS
// 2. Configured Webpack: to process the "loaders' by defining a new "rules"
//
// Later in the course:
// 1. We will learn setup Webpack for "Production"
// 2. Explore how we can create a separate "styles" file
/****************************************************************************************************************************************************/


/****************************************************************************************************************************************************/
// Ep.77: React-Router 101 - Edit/Update
// 1. Edited 'devServer: {}'
//  - Added an attribute called 'historyApiFallback: true' => This tell dev-server that we're gonna be handling "routing" via our "Client-Side Code" and should return "index.html" for all "404 Routes"
/****************************************************************************************************************************************************/


// console.log(path.join(__dirname, 'public'));

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};