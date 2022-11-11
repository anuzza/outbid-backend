const sendError = (res, statusCode, err) => {
  res.status(statusCode).send({
    error: err.message,
  });
};

module.exports = sendError;
