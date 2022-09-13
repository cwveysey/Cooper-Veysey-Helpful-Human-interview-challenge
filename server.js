const express = require("express"); // Per Mozilla, "Express is the most popular Node web framework, and is the underlying library for a number of other popular Node web frameworks...while Express itself is fairly minimalist, developers have created compatible middleware packages to address almost any web development problem. There are (Express) libraries to work with cookies, sessions, user logins, URL parameters, POST data, security headers, and many more. You can find a list of middleware packages maintained by the Express team at https://expressjs.com/en/resources/middleware.html." (see https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#introducing_express).
const cors = require("cors"); // Can be used to enable CORS ("Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources").
const logger = require('morgan'); // HTTP request logger middleware for node.js ("morgan simplifies the task of logging HTTP requests to and from your application").
const path = require('path'); // Provides utilities for working with file and directory paths.
var util = require('util') // Supports the needs of Node.js internal APIs. Many of the utilities are useful for application and module developers as well. 

// Create an Express application. The express() function is a top-level function exported by the express module.
const app = express(); 

// Allow requests to be made from any origin via the CORS middleware package.
app.use(cors());
app.options('*', cors());

// Log requests to the console via morgan logger middleware.
app.use(logger('dev'));

// Parses incoming requests that feature JSON payloads.
app.use(express.json());

// Parse requests where the content-type is "application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: true }));

 // Arrange for the application to load all route files (per https://expressjs.com/en/guide/routing.html). Please note that route files must be loaded prior to the app.get('*', ...) catch-all. If a route file is loaded after the catch-all, then the route file will not have any requests matched to it (because relevant requests will have already been matched to the catch-all).
require("./server/routes/color.routes")(app);

// For development and troubleshooting purposes, log the server.js process value.
if (process != undefined) {
    console.log(`server.js process is: ${util.inspect(process)}`);
}
if (process.env.NODE_ENV === 'production') { // See https://stackoverflow.com/questions/51013870/heroku-something-is-already-running-on-port
    // Express.static middleware makes it possible to access specified files and directories via HTTP.
    app.use(express.static("client/build"));
    // If a request does not match any routes defined by a route file that has been loaded by the application, then serve up the front-end index.html file.
    app.get("*", (req, res) => res.sendFile(path.resolve("client/build/index.html")));
}

// Specify the port on which we want the app to listen.
const PORT = process.env.PORT || 8080;
// Arrange for the app to listen on the specified port.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});