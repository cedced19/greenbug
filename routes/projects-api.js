var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');

/* GET Projects */
router.get('/', auth, function(req, res, next) {
    req.app.models.projects.find().exec(function(err, models) {
        if(err) return next(err);
        res.json(models);
    });
});

/* GET Projects with Bugs */
router.get('/bugs', auth, function(req, res, next) {
    req.app.models.projects.find().populate('bugs').exec(function(err, models) {
        if(err) return next(err);
        models.forEach(function (project) {
            project.bugs.forEach(function (bug) {
               delete bug.project;
               if (bug.path) {
                 delete bug.path;
                 delete bug.mimetype;
                 bug.screenshot = true;
               } else {
                 bug.screenshot = false
               }
            });
        });
        res.json(models);
    });
});

/* GET Projects with Servers */
router.get('/servers', auth, function(req, res, next) {
    req.app.models.projects.find().populate('servers').exec(function(err, models) {
        if(err) return next(err);
        models.forEach(function (project) {
            project.servers.forEach(function (server) {
               delete server.project;
               delete server.token;
            });
        });
        res.json(models);
    });
});

/* POST Projects: create a project */
router.post('/', auth, function(req, res, next) {
    req.app.models.projects.create(req.body, function(err, model) {
        if(err) return next(err);
        res.json(model);
    });
});

/* GET Project */
router.get('/:id', function(req, res, next) {
    req.app.models.projects.findOne({ id: req.params.id }).populate('bugs').exec(function(err, model) {
        if(err) return next(err);
        if(model === '' || model === null || model === undefined) return next(err);
        if (!req.isAuthenticated()) {
          return res.json({
            id: model.id,
            title: model.title
          });
        }
        model.bugs.forEach(function (bug) {
           delete bug.project;
           if (bug.path) {
             delete bug.path;
             delete bug.mimetype;
             bug.screenshot = true;
           } else {
             bug.screenshot = false;
           }
        });
        res.json(model);
    });
});

/* DELETE Project */
router.delete('/:id', auth, function(req, res, next) {
    req.app.models.projects.destroy({ id: req.params.id }, function(err) {
        if(err) return next(err);
        res.json({ status: true });
    });
});

/* PUT Project */
router.put('/:id', auth, function(req, res, next) {
    delete req.body.id;
    req.app.models.projects.update({ id: req.params.id }, req.body, function(err, model) {
        if(err) return next(err);
        res.json(model[0]);
    });
});

module.exports = router;
