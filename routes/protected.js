/* global module */
'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifytoken = require('../middlewares/verifytoken');
const config = require('../config/config');
const jsonpatch = require('jsonpatch'); 
const jimp = require('jimp');

app.use(verifytoken); 

// GET /protected route: Returns the user object after decoding information from JWT
router.get('/protected/', (req, res) => {
    res.status(200).json( {
      success: true,
      obj: req.decoded 
    });
  });

  // POST route to pass a json object and patch json arrays then return a json patched document
router.post('/protected/json_patch', (req, res) => {
    let theObj = req.body.obj;
    let thePatch = req.body.patch;

    if(theObj && thePatch) {  // checks if json object and json patch array have been passed from the from the body
      let patcheddoc = jsonpatch.apply_patch(theObj, thePatch); // Applies a patch to theObj
      res.status(200).json({
        success:true,
        document: patcheddoc
      });
    }else{
      res.status(400).json({
        success: false,
        message: "Please provide obj (JSON) and patch (JSON Array) on the form"
      })
    }
});

// Post endpoint to generate image thumbnail from a url
router.post('/protected/generate_thumnail', (req,res) => {
    let imgurl = req.body.imgurl;

    if(imgurl) {
      jimp.read(imgurl, function (err, thumbnail) {
        if (err){
          console.log(err);
          res.status(400).json({
            success: false,
            message: err
          })
        }else{
        thumbnail.resize(50, 50)            // resize
             .quality(60)                 // set JPEG quality
             .getBase64(jimp.AUTO, (error, thumb) => {
               if (error) throw err;
               res.status(200).json({
                 success: true,
                 message: "Thumbnail generated successfully",
                 thumbnail: thumb    // return the image thumnail
               });
             }); 
            };
      });
    }else{
      res.status(400).json({
        success: false,
        message: "Please provide/pass image url (imgurl) on the form"
      });
    }
})

module.exports = app;