const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const logger = require('morgan');

app.use(cors());
app.options('*', cors());

// Log requests to the console.
app.use(logger('dev'));

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') { // See https://stackoverflow.com/questions/51013870/heroku-something-is-already-running-on-port

    app.use(express.static("client/build"));
    app.use(express.static("client/build/static"));

    // Express will serve up the front-end index.html file if it doesn't recognize the route
    app.get("*", (req, res) => res.sendFile(path.resolve("client/build/index.html")));

}

require("./server/routes/color.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./server/models");