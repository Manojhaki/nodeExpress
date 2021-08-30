const express = require('express');
const partnerRouter = express.Router();

partnerRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all the campsites to you');
    })
    .post((req, res) => {
        res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /campsites');
    })
    .delete((req, res) => {
        res.end('Deleting all campsites');
    });



partnerRouter.route('/:partnerId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    .get((req, res) => {
        res.end(`Will send all the campsites:${req.params.partnerId} to you`);
    })
    .post((req, res) => {
        res.end(`Will add the campsite with the Id: ${req.params.partnerId}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end(`PUT in${req.params.partnerId} with  ${req.body.name} `);
    })
    .delete((req, res) => {
        res.end(`Deleting all campsites with id: ${req.params.partnerId}`);
    });

module.exports = partnerRouter;