var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');

/* GET Labels */
router.get('/', auth, function(req, res, next) {
    req.app.models.labels.find().populate('bugs').exec(function(err, models) {
        if(err) return next(err);
        res.json(models);
    });
});

/* POST Labels: create a project */
router.post('/', auth, function(req, res, next) {
    req.app.models.labels.create(req.body, function(err, model) {
        if(err) return next(err);
        res.json(model);
    });
});

/* GET Label */
router.get('/:id', auth, function(req, res, next) {
    req.app.models.labels.find({ id: req.params.id }).populate('bugs').exec(function(err, model) {
        if(err) return next(err);
        model = model[0];
        if(model === '' || model === null || model === undefined) return next(err);
        res.json(model);
    });
});

/* DELETE Label */
router.delete('/:id', auth, function(req, res, next) {
    req.app.models.labels.destroy({ id: req.params.id }, function(err) {
        if(err) return next(err);
        res.json({ status: true });
    });
});

/* PUT Label */
router.put('/:id', auth, function(req, res, next) {
    delete req.body.id;
    req.app.models.labels.update({ id: req.params.id }, req.body, function(err, model) {
        if(err) return next(err);
        res.json(model[0]);
    });
});

module.exports = router;
