const express = require('express');// importing the express module
const campsiteRouter = express.Router();// initialising the router function


// localhost:3000/campsites/
campsiteRouter.route('/')// the route with endpoint as /
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => { // response to the get request
        res.end('Will send all the campsites to you');
    })
    .post((req, res) => {// response to the post request : the name and description we defined in the postman BODY>Raw in JSon
        res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;// response of an error status of 403
        res.end('PUT operation not supported on /campsites');// Response to the endpoint of put request
    })
    .delete((req, res) => {// responds to the delete request
        res.end('Deleting all campsites');
    });



// localhost:3000/campsites/{campsiteId}

campsiteRouter.route('/:campsiteId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    .get((req, res) => {
        res.end(`Will send all the campsites:${req.params.campsiteId} to you`);
    })
    .post((req, res) => {
        res.end(`Will add the campsite with the Id: ${req.params.campsiteId}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /campsites  for name: ${req.body.name} & description: ${req.body.description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting all campsites with ID: ${req.params.campsiteId}`);
    });

//Export the campsiteRouter to the server.jsgit switch -c foo origin/foo

module.exports = campsiteRouter;