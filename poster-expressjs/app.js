'use strict';
const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const user = require('./middleware/user');
const validate = require('./middleware/validate');
const messages = require('./middleware/messages');
const page = require('./middleware/page');

const routes = require('./routes/index');
const entries = require('./routes/entries');
const users = require('./routes/users');
const register = require('./routes/register');
const login = require('./routes/login');
const api = require('./routes/api');
const Entry = require('./models/entry');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(messages);
app.use('/api', api.auth);
app.use(user);

app.get('/api/user/:id', api.user);
app.post('/api/entry', entries.submit);
app.get('/api/entries/:page?', page(Entry.count), api.entries);

app.get('/', page(Entry.count, 5), entries.list);
app.get('/page/:page', validate.pageNo(), page(Entry.count, 5), entries.list);
app.get('/post', entries.form);
app.post('/post', validate.required('entry[title]'), validate.lengthAbove('entry[title]', 4), entries.submit);

app.use('/users', users);

app.get('/register', register.form);
app.post('/register', validate.required('user[name]'), validate.required('user[pass]'), register.submit);

app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

app.use(routes.notfound);
app.use(routes.error);

module.exports = app;
