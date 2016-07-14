var express = require('express');
var router = express.Router();
var auth = require('../policies/auth.js');
var multer = require('multer')({ dest: './screenshots/'});

/* GET Bugs */
router.get('/', auth, function(req, res, next) {
    req.app.models.bugs.find().populate('project').exec(function(err, models) {
        if(err) return next(err);
        models.forEach(function (bug) {
           if (bug.path) {
             delete bug.path;
             delete bug.mimetype;
             bug.screenshot = true;
           } else {
             bug.screenshot = false;
           }
        });
        res.json(models);
    });
});

/* POST Bugs: create a bugs */
router.post('/', multer.single('screenshot'), function(req, res, next) {
    var data = {};
    if (req.file) {
      if (!/(image\/jpeg|image\/png)/.test(req.file.mimetype)) {
        var err = new Error('You haven\'t given an image.');
        err.status = 401;
        return err;
      }

      data = {
        description: req.body.description,
        project: req.body.project,
        path: req.file.filename,
        mimetype: req.file.mimetype,
        email: req.body.email
      };
    } else {
      data = req.body;
    }

    if (data.email == '')  delete data.email;

    req.app.models.bugs.create(data, function(err, model) {
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
        if (model.path) {
          delete model.path;
          delete model.mimetype;
          model.screenshot = true;
        } else {
          model.screenshot = false;
        }
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
