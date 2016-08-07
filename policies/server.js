var jwt = require('jwt-simple');

// Test if the server which send data is logged in
module.exports = function (req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
    try {
      var decoded = jwt.decode(token, req.app.get('jwt secret'));
      if (decoded.exp <= Date.now()) {
        var err = new Error('Access token has expired.');
        err.status = 401;
        return next(err);
      }
      req.server = decoded.iss;
      next();
    } catch (err) {
      err.mesage = 'Access token isn\'t valid.';
      err.status = 401;
      next(err);
    }
  } else {
    var err = new Error('No acess token provided.');
    err.status = 401;
    next(err);
  }
};