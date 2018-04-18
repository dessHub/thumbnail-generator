# thumbnail-generator

  A simple microservice Node API with the following functionalities :
    1. JWT Authentication
    2. JSON patching
    3. Image Thumbnail Generation

## Installation 

 1. Clone repository from github
 
     ```$ git clone https://github.com/dessHub/thumbnail-generator.git```
     
 2. Change directory to thumbnail-generator 
  
     ```$ cd thumbnail-generator```
     
 3. Install project dependencies.
 
    ``` $ npm install```
     
 4. TO start the API serve .
 
      ```$ npm start```
      
 **NB:** Test the application with [POSTMan](https://www.getpostman.com/)
 
 5. To run test case 
 
      ```$ npm test```


## Endpoints

   The API has public and protected endpoints. 
   
   ### Public
   
   1.(GET): / 
   ⋅⋅* Return a JSON Response 
   
   2. POST: /login
   
       *  Request body should contain an arbitrary username/password pair
       *  Return a signed [json web token](https://jwt.io/)
     
   ### Protected
   
     All protected endpoints must be attatched with JWT Token provided after the /login
     
   1. GET: /protected/
      * Return a JSON Response
   
   2. POST: /protected/json_patch
      * Requesting body must have a JSON object and a [JSON patch object]{http://jsonpatch.com/}.
      * Apply the json patch to the json object, and return the resulting json object.
   
   3. POST: /protected/generate_thumnail
      * Requesting body must have a valid image url
      * Pull the image, resize it and send a resulting thumbnail
   
   
   ## Miscellaneous
   
   1. Stack
       * Node js
       * express js
      
   2. Test Suite
       * [Mocha](https://mochajs.org/)
       * [Chai](http://www.chaijs.com/)
      
   3. Code coverage
       *  [Istanbul.](https://github.com/gotwarlost/istanbul)
     
   4. Documentation
       * [Docco](http://ashkenas.com/docco/)
      
      
