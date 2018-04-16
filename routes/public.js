/* global module */
'use strict';

const express = require('express');
let app = express();
const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Importing configuration file

// GET / index api endpoint .
app.get('/', (req, res) => {
  res.status(200).send(`Get authentication token by, POST  http://localhost:8080/login and provide an arbitrary username and password then Pass that token to 'x-access-token' header to access private endpoints`);
});