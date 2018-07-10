const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passportConfig = require("./passport");
const debug = require('debug')('myAdvisor:app');
const flash = require('connect-flash');
const {dbURL} = require('./config');

const index = require('./routes/index');
const map = require('./routes/map');
const auth = require('./routes/auth');
const profile = require("./routes/profile");
const place = require('./routes/place');
const comment = require('./routes/comment');

const app = express();

// Promessa per connessione al database
mongoose.connect(dbURL)
.then(()=> {
  debug(`Connected to db ${dbURL}`)
})
.catch(e => console.log(e)) 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);
passportConfig(app);

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.title = "MyAdvisor";
  next();
});

app.use('/', index);
app.use("/auth", auth);
app.use("/profile", profile);
app.use('/', map);
app.use('/', place);
app.use('/', comment);

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication
app.use(
  session({
    secret: "ironhack trips"
  })
);
app.use(cookieParser());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;