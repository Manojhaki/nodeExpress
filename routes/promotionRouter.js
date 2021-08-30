const express = require('express');
const promotionRouter = express.Router();

promotionRouter.route('/')
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
        res.end('Deleting all promotion');
    });



promotionRouter.route('/:promotionId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    .get((req, res) => {
        res.end(`Will send all the campsites:${req.params.promotionId} to you`);
    })
    .post((req, res) => {
        res.end(`Will add the campsite with the Id: ${req.params.promotionId}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation not supported on /promotion ${req.body.name} `);
    })
    .delete((req, res) => {
        res.end(`Deleting all campsites with id: ${req.params.promotionId}`);
    });

module.exports = promotionRouter;