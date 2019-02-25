exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return next({ status: 401, message: "Please Log In First" });
  }
};

exports.ensureCorrectUser = function(req, res, next) {
  if (req.user.id === req.params.user_id) {
    next();
  } else {
    return next({ status: 401, message: "Unauthorized User" });
  }
};
