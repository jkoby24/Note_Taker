const express = require('express');
const compression = require('compression');

// Creates an express server
const app = express();

let noteCount = 1;
// Sets an initial port.
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(compression());

// points server to route files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

//Starts the server
app.listen(PORT, function () {
  console.log('App listening on PORT: ' + PORT);
});
