var express = require('express');
var router = express.Router();
var admin = require('../policies/admin.js');

/* GET Registrants */
router.get('/', admin, function(req, res, next) {
    req.app.models.registrants.find().exec(function(err, models) {
        if(err) return next(err);
        res.json(models);
    });
});

/* POST Registrants: create a registrant */
router.post('/', function(req, res, next) {
    req.app.models.registrants.create(req.body, function(err, model) {
        if(err) return next(err);
        res.json(model);
    });
});

/* GET Registrant */
router.get('/:id', admin, function(req, res, next) {
    req.app.models.registrants.findOne({ id: req.params.id }, function(err, model) {
        if(err) return next(err);
        if(model === '' || model === null || model === undefined) return next(err);
        res.json(model);
    });
});

/* DELETE Registrant */
router.delete('/:id', admin, function(req, res, next) {
    req.app.models.registrants.destroy({ id: req.params.id }, function(err) {
        if(err) return next(err);
        res.json({ status: true });
    });
});

module.exports = router;
