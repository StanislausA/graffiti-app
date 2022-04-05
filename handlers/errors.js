const handlers = {};

handlers.createError = (location, code, error) => {
  return {
    log: `Error occurred in ${location} method with: ${error}`,
    status: code,
    message: {
      error
    }
  };
}

module.exports = handlers;
