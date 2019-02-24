const mongoose = require("mongoose");
const findOneOrCreate = require("mongoose-find-one-or-create");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

userSchema.plugin(findOneOrCreate);

const User = mongoose.model("User", userSchema);
module.exports = User;
