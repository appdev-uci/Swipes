const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/swipes");

mongoose.Promise = Promise;

module.exports.User = require("./user");
