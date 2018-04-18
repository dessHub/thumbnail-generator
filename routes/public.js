/* global module */
'use strict';

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Importing configuration file
app.set('appsecret', config.secret);

// GET / index api endpoint (public route).
app.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    message: `Get authentication token by, POST  http://localhost:8080/login and provide an arbitrary username and password then Pass that token to 'x-access-token' header to access private endpoints`
  });
});

// POST /login route  (public routes)
app.post('/login', (req, res) => {
  let user = {};
  let username = req.body.username;
  let password = req.body.password;
  user.username = username;
  user.password = password;


  if (username && password) {  // checks if both username and password have been provided.
    
    const payload = {
      user
    };
    
    let token = jwt.sign(payload, app.get('appsecret'), {
      expiresIn: 86400  // the token expires after 24 hours
    });
    res.status(200).json({
      success: true,
      message: "Token generated successfully",
      token: token
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Please provide the username and password.'
    });
  }
});

module.exports = app;
