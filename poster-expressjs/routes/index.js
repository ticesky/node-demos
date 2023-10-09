'use strict';
const createError = require('http-errors');

// catch 404 and forward to error handler
exports.notfound = (req, res, next) => {
  next(createError(404));
};

exports.error = (err, req, res, next) => {
  let msg;
  console.error(err.stack);

  switch (err.type) {
    case 'database':
      msg = 'Server Unavailable';
      res.statusCode = 503;
      break;
    default:
      msg = 'Internal Server Error';
      res.statusCode = 500;
  }

  res.format({
    html: () => {
      res.render('5xx', { msg: msg, status: res.statusCode });
    },
    json: () => {
      res.send({ error: msg });
    },
    text: () => {
      res.send(msg + '\n');
    }
  });
};
