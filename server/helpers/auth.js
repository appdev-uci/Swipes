exports.googleCallback = (req, res) => {
  return res.redirect("/");
};

exports.googleError = (req, res) => {
  return res.redirect("/signin");
};

exports.logout = (req, res) => {
  req.logout();
  console.log("it went to logout");
  console.log(req.uesr)
  res.redirect("/");
}

exports.getUser = (req, res) => {
  res.status(200).json(req.user)
}