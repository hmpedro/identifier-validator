const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const mongoose = require('./config/moongose');
const routes = require('./routes');

const bootstrap = async () => {
  const app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use(routes);

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    const { message, status } = err;
    err = req.app.get('env') === 'development' ? err : null;

    res.status(status || 500).send(err || { message });
  });

  await mongoose();

  return app;
};

module.exports = bootstrap;
