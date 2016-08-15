var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');
var jwt = require('jwt-simple');
var hash = require('password-hash-and-salt');
var randomstring = require('randomstring');

/* GET Servers */
router.get('/', auth, function(req, res, next) {
    req.app.models.servers.find().exec(function(err, models) {
        if(err) return next(err);
        models.forEach(function(model){
            delete model.password;
        });
        res.json(models);
    });
});

/* POST Servers */
router.post('/', auth, function(req, res, next) {
    var password = randomstring.generate(64);
    req.app.models.servers.create({
      title: req.body.title,
      password: password
    }, function(err, model) {
        if(err) return next(err);
        res.json({
          title: model.title,
          id: model.id
        });
    });
});

/* GET Server */
router.get('/:id', auth, function(req, res, next) {
    req.app.models.servers.findOne({ id: req.params.id }).populate('records', {limit: 100}).exec(function(err, model) {
        if(err) return next(err);
        if(model === '' || model === null || model === undefined) return next(err);
        delete model.password;
        model.records.forEach(function(record){
            delete record.server;
        });
        res.json(model);
    });
});

/* POST Setup server */
router.post('/setup/:id', function(req, res, next) {
    req.app.models.servers.findOne({ id: req.params.id }, function(err, model) {
        if (err) return next(err);
        if (model === '' || model === null || model === undefined) return next(err);
        hash(req.body.password).verifyAgainst(model.password, function(err, verified) {
              if(err || !verified) {
                err = new Error('Invalid password.');
                err.status = 401;
                next(err);
              } else {
                var expires = new Date().getTime() + 604800000;
                var token = jwt.encode({
                  iss: model.id,
                  exp: expires
                }, req.app.get('jwt secret'));
                res.json({ status: true, token: token });
              }
        });
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
