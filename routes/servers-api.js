var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');

/* GET Servers */
router.get('/', auth, function(req, res, next) {
    req.app.models.servers.find().exec(function(err, models) {
        if(err) return next(err);
        models.forEach(function(model){
            delete model.token;
        });
        res.json(models);
    });
});

/* POST Servers */
router.post('/', auth, function(req, res, next) {
    req.app.models.servers.create(req.body, function(err, model) {
        if(err) return next(err);
        res.json(model);
    });
});

/* GET Server */
router.get('/:id', auth, function(req, res, next) {
    req.app.models.servers.findOne({ id: req.params.id }, function(err, model) {
        if(err) return next(err);
        if(model === '' || model === null || model === undefined) return next(err);
        res.json(model);
    });
});

/* DELETE Server */
router.delete('/:id', auth, function(req, res, next) {
    req.app.models.servers.destroy({ id: req.params.id }, function(err) {
        if(err) return next(err);
        res.json({ status: true });
    });
});

module.exports = router;
