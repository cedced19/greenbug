// Test if user is authenticated and if user is an administrator
module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.admin) {
      return next();
    }
    var err = new Error('You don\'t have the required abilities.');
    err.status = 401;
    return next(err);
  } else {
    res.redirect('/login');
  }
};
