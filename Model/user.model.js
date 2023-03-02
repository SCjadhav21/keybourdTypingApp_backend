const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Name: String,
  Difficulty: String,
  Score: Number,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
