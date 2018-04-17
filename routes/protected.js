/* global module */
'use strict';

const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const verifytoken = require('../middlewares/verifytoken');
const config = require('../config/config');
const jsonpatch = require('jsonpatch'); 

app.use(verifytoken); 

// GET /api route: Returns the user object after decoding information from JWT
app.get('/', (req, res) => {
    res.status(200).json( req.decoded );
  });

app.post('/json_patch', (req, res) => {
    let theObj = req.body.obj;
    let thePatch = req.body.patch;

    console.log(thePatch);
    if(theObj && thePatch) {
      let patcheddoc = jsonpatch.apply_patch(theObj, thePatch);
      res.status(200).json(patcheddoc);
    }else{
      res.status(400).json({
        success: false,
        message: "Please provide obj (JSON) and patch (JSON Array) on the form"
      })
    }
})

module.exports = app;