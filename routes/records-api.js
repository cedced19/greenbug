var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');
var serverAuth = require('../policies/server.js');

/* GET Records */
router.get('/', auth, function(req, res, next) {
    req.app.models.records.find().exec(function(err, models) {
        if(err) return next(err);
        res.json(models);
    });
});

/* POST Records */
router.post('/', serverAuth, function(req, res, next) {
    req.body.server = req.server;
    req.app.models.records.create(req.body, function(err, model) {
        if(err) return next(err);
        res.json({ status: true });
    });
});

/* GET Records */
router.get('/:id', auth, function(req, res, next) {
    req.app.models.records.findOne({ id: req.params.id }, function(err, model) {
        if(err) return next(err);
        if(model === '' || model === null || model === undefined) return next(err);
        res.json(model);
    });
});

/* DELETE Records */
router.delete('/:id', auth, function(req, res, next) {
    req.app.models.records.destroy({ id: req.params.id }, function(err) {
        if(err) return next(err);
        res.json({ status: true });
    });
});

module.exports = router;
