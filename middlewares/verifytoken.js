/* global module */
'use strict';

// Including the packages.
const express = require('express');
let app = express();
const jwt = require('jsonwebtoken');

// Including the local files.
const config = require('../config/config');
app.set('appsecret', config.secret);

// This the middleware function to verify tokens.
module.exports = (req, res, next) => {
   const token = req.body.token || req.query.token || req.headers['token'];
    if (token) {
    // verifies secret and checks expiry
    jwt.verify(token, app.get('appsecret'), (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Incorrect Token. Authenticaion Failed.'
        });
      } else {  // if verified, save the decoded in the req object and proceed
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // forbidden without token
    return res.status(400).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
