const path = require('path');
const express = require('express');
const controller = require('./controller');
require('dotenv').config();

const APP = express();
const PORT = process.env.PORT;

APP.use(express.json());

if (process.env.NODE_ENV == 'production') {
  APP.use('/build', express.static(path.resolve(__dirname, '../build')));

  APP.get('/', (request, response) => {
    return response.status(200).sendFile(path.resolve(__dirname, '../index.html'));
  });
}

// GET snippets
APP.get('/snippets', controller.getSnippets, (request, response) => {
  return response.status(200).json(response.locals);
});

// CREATE snippet
APP.post('/snippets', controller.postSnippet, (request, response) => {
  return response.status(201).send('Snippet created!');
});

// Unknown endpoint handler
APP.all('*', (request, response) => response.status(404).send('<h1>Whoops! Looks like you made a wrong turn.</h1>'));

// Global error handler
APP.use((error, request, response, next) => {
  const defaultError = {
    log: 'Global handler caught unknown error.',
    status: 500,
    message: {
      error: 'Unknown error occurred.'
    }
  };
  const mergedError = Object.assign(defaultError, error);
  console.log(mergedError);
  return response.status(mergedError.status).json(mergedError.message);
});

APP.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

module.exports = APP;
