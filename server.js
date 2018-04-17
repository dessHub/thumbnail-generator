/* global module */
'use strict';

// get all the packages need by the app
const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const morgan       = require('morgan');
const bodyParser   = require('body-parser');
const config = require('./config/config');
const privateRoutes = require('./routes/protected');
const publicRoutes = require('./routes/public');;

app.use(morgan('dev')); // log every request to the console

// parse application/json
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));

// routes ======================================================================
app.use('/', publicRoutes); // load public routes and pass in app 
app.use('/protected', privateRoutes); // load private/protected routes and pass in app

// launch ======================================================================
app.listen(port, () => {
    console.log('It is live on port ' + port);
});


