// path for URL
const path = require('path');

module.exports = function (app) {
  // The code below handles when a user visits a page
  app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // return index.html file
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  // If no matching route is found default to home
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};
