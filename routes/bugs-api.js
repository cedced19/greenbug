var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');

/* GET Bugs */
router.get('/', auth, function(req, res, next) {
    req.app.models.bugs.find().populate('project').exec(function(err, models) {
        if(err) return next(err);
        res.json(models);
    });
});

/* POST Bugs: create a bugs */
router.post('/', function(req, res, next) {
    req.app.models.bugs.create(req.body, function(err, model) {
        if(err) return next(err);
        res.json(model);
    });
});

/* GET Bugs */
router.get('/:id', auth, function(req, res, next) {
    req.app.models.bugs.find({ id: req.params.id }).populate('project').exec(function(err, model) {
        if (err) return next(err);
        model = model[0];
        if (model === '' || model === null || model === undefined) return next(err);
        res.json(model);
    });
});

/* DELETE Bugs */
router.delete('/:id', auth, function(req, res, next) {
    req.app.models.bugs.destroy({ id: req.params.id }, function(err) {
        if(err) return next(err);
        res.json({ status: true });
    });
});

/* PUT Bugs */
router.put('/:id', auth, function(req, res, next) {
    delete req.body.id;
    req.app.models.bugs.update({ id: req.params.id }, req.body, function(err, model) {
        if(err) return next(err);
        res.json(model[0]);
    });
});

module.exports = router;
