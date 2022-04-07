const database = require('../database/firestore');
const firestore = require('firebase/firestore/lite');
const handlers = require('../handlers/errors');

const controllers = {};

controllers.getSnippets = async (request, response, next) => {
  try {
    const snippetsCollection = firestore.collection(database, 'snippets');
    const snippetSnapshot = await firestore.getDocs(snippetsCollection);
    const snippetList = snippetSnapshot.docs.map(snippet => snippet.data());
    response.locals.snippets = snippetList;
    return next();
  } catch (error) {
    return next(handlers.createError('getDocs', 418, new Error(`Error retrieving snippets: ${ snippetSnapshot }`)))
  }
}

controllers.postSnippet = async (request, response, next) => {
  const snippet = request.body.snippet.trim();
  
  if (!snippet) return next(handlers.createError('postSnippet', 400, new Error('Invalid user inputs.')));

  try {
    const snippetsCollection = firestore.collection(database, 'snippets');
    const snippetDoc = await firestore.addDoc(snippetsCollection, { content: snippet, date: firestore.Timestamp.now() });
    response.locals.snippet = snippetDoc;
    return next();
  } catch (error) {
    return next(handlers.createError('addDoc', 500, new Error(`Error creating snippet: ${ snippetDoc }`)));
  }
}

module.exports = controllers;
